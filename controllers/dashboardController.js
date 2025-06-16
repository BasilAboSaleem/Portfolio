const User = require("../models/user");
const Setting = require("../models/setting");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.dashboard_about_get = async (req, res) => {
    try{
        const setting = await Setting.findOne({});
        res.render('pages/dashboard/content/about', {
            title: 'About',
            setting: setting,
        });

    }
    catch (error) {
        console.error('Error fetching about page:', error);
        res.status(500).render('pages/dashboard/404', { error: 'An error occurred while fetching the about page.' });
    }
}