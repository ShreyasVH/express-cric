const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const { error: errorResponse } = require('./responses/response');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const MyException = require('./exceptions/myException');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ['https://cric.react.com', 'https://cric.angular.com', 'https://cric.vue.com', 'https://cric.sveltekit.com', 'https://cric.solid.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (origin && !allowedOrigins.includes(origin)) {
      callback(new Error('Not allowed by CORS'));
    } else {
      callback(null, origin);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Accept', 'Origin', 'X-Requested-With', 'Content-Type', 'Referer', 'User-Agent', 'Access-Control-Allow-Origin'],
};
app.use(cors(corsOptions));

const swaggerJson = JSON.parse(fs.readFileSync('./swagger.json').toString());

const options = {
  definition: swaggerJson,
  apis: ['./routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJsDoc(options);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes)

app.use('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
})

app.use((err, req, res, next) => {
  let status = 500;
  let message = err.message;

  if (err instanceof MyException) {
    status = err.httpStatusCode;
    message = err.description;
  }

  res
    .status(status)
    .json(errorResponse(message));
})

app.listen(process.env.PORT, () => console.log('app listening on port ' + process.env.PORT + '!'))

module.exports = {
  app
}
