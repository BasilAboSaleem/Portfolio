const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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