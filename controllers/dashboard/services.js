const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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