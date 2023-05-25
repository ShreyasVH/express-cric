const express = require('express')

const country = require('../controllers/country')

const router = express.Router()


router.post('/cric/v1/countries', country.create)
router.get('/cric/v1/countries/name/:name', country.searchByName)

module.exports = router
