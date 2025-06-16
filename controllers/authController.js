const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.login_get = (req, res) => {
  res.render("pages/dashboard/login");
}
exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({notFoundEmail: "Email not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({errPassword: "Invalid password"});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Prevent CSRF attacks
    });
     return res.json({success: "Login successful",  redirectTo: '/dashboard'});

    
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).render('pages/dashboard/404', { error: 'An error occurred while logging in.' });
  }
}

exports.logout_get = (req, res) => {
  console.log("Logged out");
        res.clearCookie('token');
        res.clearCookie('jwt');
        res.redirect('/login');
}