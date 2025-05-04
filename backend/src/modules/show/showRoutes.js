const express = require('express');
const showSchema = require('./showValidator');
const { validateSchema } = require('../../middlewares/validateMiddleware')
const { getShows, getSeatsForShow } = require('./showController')

const router = express.Router();

router.get('/', validateSchema(showSchema), getShows);

router.get('/seats', getSeatsForShow)

module.exports = router;