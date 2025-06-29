const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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