const express = require('express');
const showSchema = require('../validators/showValidator');
const { validateSchema } = require('../middlewares/validateMiddleware')
const { getShows } = require('../controllers/showController')

const router = express.Router();

router.get('/shows', validateSchema(showSchema), getShows);



module.exports = router;