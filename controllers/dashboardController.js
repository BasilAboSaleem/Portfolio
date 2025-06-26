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
const e = require("express");
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

exports.dashboard_cv_get = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
        }
        res.render('pages/dashboard/content/cv', {
            title: 'Manage CV',
            setting: setting,
        });
    }
    catch (error) {
        console.error("Error fetching CV section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the CV page.' });
    }
};
exports.dashboard_cv_put = async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: 'portfolio/cv',
        use_filename: true,
        unique_filename: false,
      });
      fs.unlinkSync(req.file.path);
      req.body.fileUrl = result.secure_url;
    }

    const cv = req.body;
    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();
    if (!setting.cv) setting.cv = {}; 

    setting.cv.fileUrl = cv.fileUrl || setting.cv.fileUrl;

    await setting.save();

    req.flash('success', 'CV updated successfully.');
    res.redirect('/dashboard/cv');
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the CV.',
    });
  }
};

exports.dashboard_skills_get = async (req, res) => {
    try{
        const setting = await Setting.findOne();
        res.render('pages/dashboard/content/skills', {
            title: 'Skills',
            setting: setting,
        });

    }
    catch (error) {
        console.error("Error fetching skills section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the skills page.' });
    }
}
exports.dashboard_skills_put = async (req, res) => {
  try {
    const { skillsSection } = req.body;

    if (!skillsSection || !Array.isArray(skillsSection)) {
      req.flash('error', 'No skills were submitted.');
      return res.redirect('/dashboard/skills');
    }

    const filteredSkills = skillsSection.filter(
      (skill) => skill.name && skill.iconClass && skill.colorClass
    );

    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }

    setting.skillsSection = filteredSkills;
    await setting.save();

    req.flash('success', 'Skills section updated successfully.');
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error updating skills section:', error);
    res
      .status(500)
      .render('pages/dashboard/errors/404', {
        error: 'An error occurred while updating the skills page.',
      });
  }
};

exports.dashboard_resume_get = async (req, res) => {
  try{
    const setting = await Setting.findOne();
    if (!setting) {
      new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
    }

    res.render('pages/dashboard/content/resume', {
      title: 'Resume',
      setting: setting,
    });

  }
  catch (error) {
    console.error("Error fetching resume section:", error);
    res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the resume page.' });
  }
}
exports.dashboard_resume_put = async (req, res) => {
  try {
    const { resumeSection } = req.body;

    if (!resumeSection || typeof resumeSection !== 'object') {
      req.flash('error', 'No resume data was submitted.');
      return res.redirect('/dashboard/resume');
    }

    // توحيد تنسيق الحقول التي قد تأتي كعنصر مفرد أو كمصفوفة
    const formatArray = (field) => {
      if (!resumeSection[field]) return [];
      if (Array.isArray(resumeSection[field])) return resumeSection[field];
      return [resumeSection[field]];
    };

    const newResumeSection = {
      summary: {
        name: resumeSection.summary?.name || '',
        title: resumeSection.summary?.title || '',
        description: resumeSection.summary?.description || '',
        address: resumeSection.summary?.address || '',
        phone: resumeSection.summary?.phone || '',
        email: resumeSection.summary?.email || ''
      },
      education: formatArray('education').map((edu) => ({
        degree: edu.degree || '',
        field: edu.field || '',
        year: edu.year || '',
        institution: edu.institution || '',
        details: edu.details || ''
      })),
      experience: formatArray('experience').map((exp) => ({
        title: exp.title || '',
        period: exp.period || '',
        company: exp.company || '',
        responsibilities: Array.isArray(exp.responsibilities)
          ? exp.responsibilities
          : [exp.responsibilities || '']
      }))
    };

    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();

    setting.resumeSection = newResumeSection;
    await setting.save();

    req.flash('success', 'Resume section updated successfully.');
    res.redirect('/dashboard/resume');
  } catch (error) {
    console.error('Error updating resume section:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the resume page.'
    });
  }
};

exports.dashboard_portfolio_get = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
        }

        res.render('pages/dashboard/content/portfolio', {
            title: 'Portfolio',
            setting: setting,
        });

    } catch (error) {
        console.error("Error fetching portfolio section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the portfolio page.' });
    }
}
exports.dashboard_portfolio_put = async (req, res) => {
  try {
    const { portfolioSection } = req.body;
    const files = req.files || [];

    if (!portfolioSection || typeof portfolioSection !== 'object') {
      req.flash('error', 'No portfolio data was submitted.');
      return res.redirect('/dashboard/portfolio');
    }

    // توحيد تنسيق الحقول التي قد تأتي كعنصر مفرد أو كمصفوفة
    const formatArray = (field) => {
      if (!portfolioSection[field]) return [];
      if (Array.isArray(portfolioSection[field])) return portfolioSection[field];
      return [portfolioSection[field]];
    };

    const items = formatArray('items');

    // تحميل البيانات الحالية من الداتابيز للاحتفاظ بالصور القديمة عند الحاجة
    const existingSetting = await Setting.findOne();
    const existingItems = existingSetting?.portfolioSection?.items || [];

    const updatedItems = await Promise.all(
      items.map(async (item, index) => {
        const fieldName = `portfolioSection[items][${index}][imageFile]`;
        const matchingFile = files.find((file) => file.fieldname === fieldName);

        let imageUrl = '';

        if (matchingFile) {
          const uploadResult = await cloudinary.uploader.upload(matchingFile.path, {
            folder: 'portfolio/items',
            use_filename: true,
          });
          imageUrl = uploadResult.secure_url;
        } else {
          // في حال لم يتم رفع صورة جديدة، نستخدم الصورة القديمة من الداتابيز
          const existingItem = existingItems[index];
          imageUrl = existingItem?.imageUrl || '';
        }

        return {
          title: item.title || '',
          categoryClass: item.categoryClass || '',
          imageUrl,
          description: item.description || '',
          previewTitle: item.previewTitle || '',
          previewImage: item.previewImage || '',
          galleryGroup: item.galleryGroup || '',
          detailsLink: item.detailsLink || '',
          order: parseInt(item.order) || 0
        };
      })
    );

    const newPortfolioSection = {
      mainTitle: portfolioSection.mainTitle || '',
      description: portfolioSection.description || '',
      filters: formatArray('filters').map((filter) => ({
        name: filter.name || '',
        className: filter.className || ''
      })),
      items: updatedItems
    };

    let setting = existingSetting;
    if (!setting) setting = new Setting();

    setting.portfolioSection = newPortfolioSection;
    await setting.save();

    req.flash('success', 'Portfolio section updated successfully.');
    res.redirect('/dashboard/portfolio');
  } catch (error) {
    console.error('Error updating portfolio section:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the portfolio page.'
    });
  }
};

exports.dashboard_services_get = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
        }

        res.render('pages/dashboard/content/services', {
            title: 'Services',
            setting: setting,
        });

    } catch (error) {
        console.error("Error fetching services section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the services page.' });
    }
}
exports.dashboard_services_put = async (req, res) => {
  try {
    const servicesSection = req.body.servicesSection;
    if (!servicesSection) {
      req.flash('error', 'No services data was submitted.');
      return res.redirect('/dashboard/services');
    }

    // توحيد البيانات إلى مصفوفة حتى لو كانت خدمة واحدة فقط
    const formatArray = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      return [field];
    };

    const servicesArray = formatArray(servicesSection).map(service => ({
      title: service.title || '',
      icon: service.icon || '',
      description: service.description || ''
    }));

    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();

    setting.servicesSection = servicesArray;
    await setting.save();

    req.flash('success', 'Services section updated successfully.');
    res.redirect('/dashboard/services');
  } catch (error) {
    console.error('Error updating services section:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the services page.'
    });
  }
};

exports.dashboard_contact_get = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
        }

        res.render('pages/dashboard/content/contact', {
            title: 'Contact',
            setting: setting,
        });

    } catch (error) {
        console.error("Error fetching contact section:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the contact page.' });
    }
};
exports.dashboard_contact_put = async (req, res) => {
  try {
    const contactSection = req.body.contactSection;
    if (!contactSection) {
      req.flash('error', 'No contact data was submitted.');
      return res.redirect('/dashboard/contact');
    }

    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();

    setting.contactSection = {
      address: contactSection.address || '',
      phone: contactSection.phone || '',
      email: contactSection.email || '',
      mapEmbedUrl: contactSection.mapEmbedUrl || ''
    };

    await setting.save();

    req.flash('success', 'Contact section updated successfully.');
    res.redirect('/dashboard/contact');
  } catch (error) {
    console.error('Error updating contact section:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the contact page.'
    });
  }
};

exports.dashboard_generalSettings_get = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            new Setting(); // إذا لم توجد إعدادات، قم بإنشاء واحدة جديدة
        }

        res.render('pages/dashboard/content/generalSettings', {
            title: 'General Settings',
            setting: setting,
        });

    } catch (error) {
        console.error("Error fetching general settings:", error);
        res.status(500).render('pages/dashboard/errors/404', { error: 'An error occurred while fetching the general settings page.' });
    }
};
exports.dashboard_generalSettings_put = async (req, res) => {
  try {
    const heroSection = req.body.heroSection || {};
    const socialLinks = req.body.socialLinks || {};

    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();

    let backgroundImageUrl = heroSection.backgroundImage || setting.heroSection?.backgroundImage || '';

    // إذا تم رفع ملف جديد
    if (req.file) {
      // ارفع الصورة للكلاودنري
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio/hero_images',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      // استبدل رابط الخلفية برابط الصورة المرفوعة
      backgroundImageUrl = result.secure_url;

      // حذف الملف المؤقت من السيرفر بعد الرفع
      fs.unlinkSync(req.file.path);
    }

    setting.heroSection = {
      name: heroSection.name || setting.heroSection?.name || '',
      jobTitle: heroSection.jobTitle || setting.heroSection?.jobTitle || '',
      welcomeMessage: heroSection.welcomeMessage || setting.heroSection?.welcomeMessage || '',
      backgroundImage: backgroundImageUrl,
    };

    setting.socialLinks = {
      github: socialLinks.github || setting.socialLinks?.github || '',
      linkedin: socialLinks.linkedin || setting.socialLinks?.linkedin || '',
      twitter: socialLinks.twitter || setting.socialLinks?.twitter || '',
      facebook: socialLinks.facebook || setting.socialLinks?.facebook || '',
      instagram: socialLinks.instagram || setting.socialLinks?.instagram || '',
      youtube: socialLinks.youtube || setting.socialLinks?.youtube || '',
    };

    await setting.save();

    req.flash('success', 'General settings updated successfully.');
    res.redirect('/dashboard/generalSettings');
  } catch (error) {
    console.error('Error updating general settings:', error);
    res.status(500).render('pages/dashboard/errors/404', {
      error: 'An error occurred while updating the general settings page.'
    });
  }
};