const express = require('express');

const router = express.Router();
const { protect, authorize } = require('../auth/auth.middleware');

router.use(protect);
router.use(authorize('Admin'));

router.use('/movies', require('../movie/movie.admin.routes'));

module.exports = router;