const Response = require('../responses/response');

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const ok = (res, data) => {
  status(res, data, 200)
}

const created = (res, data) => {
  status(res, data, 201);
}

const status = (res, data, code) => {
  res.status(code).json(Response.success(data));
}

module.exports = {
  asyncHandler,
  ok,
  created
};
