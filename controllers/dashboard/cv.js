const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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
