const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto, streamifier
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
     let setting = await Setting.findOne();
if (!setting) {
    setting = new Setting();    
    await setting.save();
}

        // تحديث رابط السيرة الذاتية
        setting.cv = {
            fileUrl: req.body.fileUrl
        };

        await setting.save();
        req.flash('success', 'CV updated successfully');
        res.redirect('/dashboard/cv');
    } catch (error) {
        console.error("Error updating CV:", error);
        res.status(500).json({ error: 'An error occurred while updating the CV.' });
    }
};







