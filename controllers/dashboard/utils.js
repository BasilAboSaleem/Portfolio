const User = require("../../models/user");
const Setting = require("../../models/setting");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const moment = require('moment');
const multer  = require('multer')
const upload = multer({storage: multer.diskStorage({})});
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const fs = require('fs');
const path = require("path");
const { Parser } = require('json2csv');
const { send } = require("process");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const e = require("express");
 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


  module.exports = {
  User,
  Setting,
  check,
  validationResult,
  bcrypt,
  jwt,
  moment,
  upload,
  cloudinary,
  fs,
  path,
  Parser,
  nodemailer,
  crypto
};