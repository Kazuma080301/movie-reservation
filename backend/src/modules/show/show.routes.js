const express = require('express');
const showSchema = require('./show.validator');
const { validateSchema } = require('../../middlewares/validateMiddleware')
const { getShows, getSeatsForShow } = require('./show.controller')

const router = express.Router();

router.get('/', validateSchema(showSchema), getShows);

router.get('/seats', getSeatsForShow)

module.exports = router;