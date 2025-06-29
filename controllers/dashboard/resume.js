const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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
