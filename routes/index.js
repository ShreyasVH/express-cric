const express = require('express')

const country = require('../controllers/country')
const stadium = require('../controllers/stadium')
const team = require('../controllers/team')
const tour = require('../controllers/tour')
const player = require('../controllers/player')
const series = require('../controllers/series')

const router = express.Router()


router.post('/cric/v1/countries', country.create)
router.get('/cric/v1/countries/name/:name', country.searchByName)
router.get('/cric/v1/countries', country.getAll)

router.post('/cric/v1/stadiums', stadium.create)
router.get('/cric/v1/stadiums', stadium.getAll)

router.post('/cric/v1/teams', team.create)
router.get('/cric/v1/teams', team.getAll)

router.post('/cric/v1/tours', tour.create)
router.get('/cric/v1/tours/year/:year', tour.getAllForYear)

router.post('/cric/v1/players', player.create)
router.get('/cric/v1/players', player.getAll)

router.post('/cric/v1/series', series.create)
router.get('/cric/v1/series', series.getAll)
router.put('/cric/v1/series/:id', series.update)

module.exports = router
