const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({})});


router.get('/dashboard/about', requireAuth,  dashboardController.dashboard_about_get);
router.put('/dashboard/about', requireAuth,upload.single("profileImage"), dashboardController.dashboard_about_put);
router.get("/dashboard/skills", requireAuth, dashboardController.dashboard_skills_get);
router.delete('/dashboard/skills/:id', requireAuth, dashboardController.dashboard_skills_delete);
module.exports = router;
