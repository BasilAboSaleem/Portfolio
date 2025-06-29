const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard/dashboardController');
const { requireAuth } = require('../middlewares/authMiddlewares');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({})});


router.get('/dashboard/about', requireAuth,  dashboardController.aboutController.dashboard_about_get);
router.put('/dashboard/about', requireAuth,upload.single("profileImage"), dashboardController.aboutController.dashboard_about_put);
router.get("/dashboard/cv", requireAuth, dashboardController.cvController.dashboard_cv_get);
router.put("/dashboard/cv", requireAuth, upload.single("fileUrl"), dashboardController.cvController.dashboard_cv_put);
router.get("/dashboard/skills", requireAuth, dashboardController.skillsController.dashboard_skills_get);
router.put("/dashboard/skills", requireAuth, dashboardController.skillsController.dashboard_skills_put);
router.get("/dashboard/resume", requireAuth, dashboardController.resumeController.dashboard_resume_get);
router.put("/dashboard/resume", requireAuth, dashboardController.resumeController.dashboard_resume_put);
router.get("/dashboard/portfolio", requireAuth, dashboardController.portfolioController.dashboard_portfolio_get);
router.put("/dashboard/portfolio", requireAuth, upload.any(), dashboardController.portfolioController.dashboard_portfolio_put);
router.get("/dashboard/services", requireAuth, dashboardController.servicesController.dashboard_services_get);
router.put("/dashboard/services", requireAuth, dashboardController.servicesController.dashboard_services_put);
router.get("/dashboard/contact", requireAuth, dashboardController.contactController.dashboard_contact_get);
router.put("/dashboard/contact", requireAuth, dashboardController.contactController.dashboard_contact_put);
router.get("/dashboard/generalSettings", requireAuth, dashboardController.generalSettingsController.dashboard_generalSettings_get);
router.put("/dashboard/generalSettings", requireAuth, upload.single("backgroundImage") ,dashboardController.generalSettingsController.dashboard_generalSettings_put);
module.exports = router;
