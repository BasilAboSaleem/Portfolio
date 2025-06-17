const User = require("../models/user");
const Setting = require("../models/setting");
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
 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

exports.dashboard_about_get = async (req, res) => {
    try{
        const setting = await Setting.findOne();
        res.render('pages/dashboard/content/about', {
            title: 'About',
            setting: setting,
        });

    }
    catch (error) {
       
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the about page.' });
    }
}
exports.dashboard_about_put = async (req, res) => {
    try{
        console.log("PUT Route Triggered")
        // إذا تم تحميل صورة جديدة، قم برفعها إلى كلاودنري
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'portfolio/about',
                use_filename: true,
                unique_filename: false
            });
            // حذف الصورة المحلية بعد الرفع
            fs.unlinkSync(req.file.path);
            req.body.profileImage = result.secure_url; // تحديث رابط الصورة في الطلب
        }
        const about = req.body;
        let  setting = await Setting.findOne();
        if (!setting) {
            setting = new Setting();
        }
        setting.aboutSection.mainTitle = about.mainTitle || setting.aboutSection.mainTitle;
        setting.aboutSection.headerContent = about.headerContent || setting.aboutSection.headerContent;
        setting.aboutSection.profession = about.profession || setting.aboutSection.profession;
        setting.aboutSection.description = about.description || setting.aboutSection.description;
        setting.aboutSection.profileImage = about.profileImage || setting.aboutSection.profileImage;
        setting.aboutSection.birthday = about.birthday || setting.aboutSection.birthday;
        setting.aboutSection.website = about.website || setting.aboutSection.website;
        setting.aboutSection.phone = about.phone || setting.aboutSection.phone;
        setting.aboutSection.city = about.city || setting.aboutSection.city;
        setting.aboutSection.age = about.age || setting.aboutSection.age;
        setting.aboutSection.degree = about.degree || setting.aboutSection.degree;
        setting.aboutSection.email = about.email || setting.aboutSection.email;
        setting.aboutSection.freelance = about.freelance || setting.aboutSection.freelance;
        setting.aboutSection.footerContent = about.footerContent || setting.aboutSection.footerContent;

        await setting.save();
        req.flash('success', 'About section updated successfully.');
        res.redirect('/dashboard');

    }
    catch (error) {
        console.error("Error updating about section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while updating the about page.' });
    }
}