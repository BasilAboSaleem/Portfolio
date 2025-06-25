const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({})});


router.get('/dashboard/about', requireAuth,  dashboardController.dashboard_about_get);
router.put('/dashboard/about', requireAuth,upload.single("profileImage"), dashboardController.dashboard_about_put);
router.get("/dashboard/cv", requireAuth, dashboardController.dashboard_cv_get);
router.put("/dashboard/cv", requireAuth, upload.single("fileUrl"), dashboardController.dashboard_cv_put);
router.get("/dashboard/skills", requireAuth, dashboardController.dashboard_skills_get);
router.get("/dashboard/resume", requireAuth, dashboardController.dashboard_resume_get);
router.put("/dashboard/resume", requireAuth, dashboardController.dashboard_resume_put);
router.get("/dashboard/portfolio", requireAuth, dashboardController.dashboard_portfolio_get);
router.put("/dashboard/portfolio", requireAuth, dashboardController.dashboard_portfolio_put);
router.get("/dashboard/services", requireAuth, dashboardController.dashboard_services_get);
router.put("/dashboard/services", requireAuth, dashboardController.dashboard_services_put);
router.get("/dashboard/contact", requireAuth, dashboardController.dashboard_contact_get);
router.put("/dashboard/contact", requireAuth, dashboardController.dashboard_contact_put);
router.get("/dashboard/generalSettings", requireAuth, dashboardController.dashboard_generalSettings_get);
router.put("/dashboard/generalSettings", requireAuth,  dashboardController.dashboard_generalSettings_put);
module.exports = router;
