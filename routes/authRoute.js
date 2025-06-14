const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const e = require('connect-flash');
const { check, validationResult } = require("express-validator");


router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get("/logout", authController.logout_get);


module.exports = router;