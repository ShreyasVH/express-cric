const express = require('express')

const country = require('../controllers/country')
const stadium = require('../controllers/stadium')
const team = require('../controllers/team')

const router = express.Router()


router.post('/cric/v1/countries', country.create)
router.get('/cric/v1/countries/name/:name', country.searchByName)
router.get('/cric/v1/countries', country.getAll)

router.post('/cric/v1/stadiums', stadium.create)
router.get('/cric/v1/stadiums', stadium.getAll)

router.post('/cric/v1/teams', team.create)
router.get('/cric/v1/teams', team.getAll)

module.exports = router
