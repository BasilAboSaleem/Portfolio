const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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