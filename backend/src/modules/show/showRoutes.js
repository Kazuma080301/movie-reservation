const express = require('express');
const showSchema = require('./showValidator');
const { validateSchema } = require('../../middlewares/validateMiddleware')
const { getShows } = require('./showController')

const router = express.Router();

router.get('/shows', validateSchema(showSchema), getShows);



module.exports = router;