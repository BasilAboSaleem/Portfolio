const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({})});


router.get('/dashboard/about', requireAuth,  dashboardController.dashboard_about_get);
router.put('/dashboard/about', requireAuth,upload.single("profileImage"), dashboardController.dashboard_about_put);
module.exports = router;
