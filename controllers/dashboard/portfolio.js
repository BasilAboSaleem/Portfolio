const {
  Setting, check, validationResult, bcrypt, jwt, moment, upload, cloudinary, fs, path, Parser,
   nodemailer, crypto
} = require('./utils');


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

        // تحويل النص إلى مصفوفة للفئات (categoryClasses)
        let categoryClasses = [];
        if (item.categoryClasses && typeof item.categoryClasses === 'string') {
          categoryClasses = item.categoryClasses
            .split(',')
            .map(c => c.trim())
            .filter(c => c.length > 0);
        } else if (Array.isArray(item.categoryClasses)) {
          categoryClasses = item.categoryClasses;
        }

        return {
          title: item.title || '',
          categoryClasses, 
          imageUrl,
          description: item.description || '',
          previewTitle: item.previewTitle || '',
          previewLink: item.previewLink || '',
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
