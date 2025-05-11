const express = require('express');
const multer = require('multer');
const { uploadMovies } = require('./movie.admin.controller')

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadMovies);

module.exports = router;