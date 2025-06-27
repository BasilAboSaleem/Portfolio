const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController')
const { checkIfUser , requireAuth} = require('../middlewares/authMiddlewares');

router.get('/', coreController.index_get);
router.post('/contact', coreController.contact_post);
router.get("/dashboard", requireAuth, coreController.dashboard_get);

module.exports = router;