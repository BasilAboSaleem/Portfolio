const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middlewares/authMiddlewares');

router.get('/dashboard/about', requireAuth,  dashboardController.dashboard_about_get);
module.exports = router;
