const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({

  heroSection: {
    name: String,
    jobTitle: String,
    welcomeMessage: String,
    backgroundImage: String,
  },

aboutSection: {
  mainTitle: String,      // "About Me"
  headerContent: String, // "Who I am"
  profession: String,     // "UI/UX Designer & Web Developer"
  description: String,    // الفقرة الرئيسية 
  profileImage: String,
  birthday: String,
  website: String,
  phone: String,
  city: String,
  age: Number,
  degree: String,
  email: String,
  freelance: String,
  footerContent: String
}
,
 cv: {
  fileUrl: String, 
},

  factsSection: [
    {
      title: String,
      count: Number,
      icon: String,
    }
  ],

  skillsSection: [
    {
      name: String,
      iconClass: String,          // كلاس الأيقونة FontAwesome
      colorClass: String
    }
  ],

  resumeSection: {
    summary: {
    name: String,
    title: String, // مثل: "Graphic Designer"
    description: String,
    address: String,
    phone: String,
    email: String
  },
    education: [
      {
      degree: String, 
      field: String, 
      year: String,   
      institution: String,
      details: String
      }
    ],
    experience: [
      {
      title: String,      // مثل: Senior Graphic Designer
      period: String,     // مثل: 2019 - Present
      company: String,    // مثل: Experion, New York, NY
      responsibilities: [String] // قائمة المهام (multiple lines)
      }
    ]
  },

  
  portfolioSection: {
    mainTitle: { type: String, default: 'Portfolio' },
    description: { type: String, default: '' },

    filters: [
      {
        name: { type: String },       // مثل: "App"
        className: { type: String }   // مثل: "filter-app"
      }
    ],

    items: [
      {
        title: { type: String, required: true },
        categoryClasses: [{ type: String, required: true }], // filter-app, filter-books...
        imageUrl: { type: String, required: true },       // الصورة المصغرة (Thumbnail)
        description: { type: String },
        previewTitle: { type: String },
        detailsLink: { type: String },                   // رابط التفاصيل على جيت هاب
        previewLink: { type: String },                   // رابط المعاينة
        galleryGroup: { type: String },                  // portfolio-gallery-app
        order: { type: Number, default: 0 }
      }
    ]
  },

  servicesSection: [
    {
      title: String,
      icon: String,
      description: String
    }
  ],
//لاحقا سيتم اضافته
  testimonialsSection: [
    {
      name: String,
      image: String,
      content: String
    }
  ],

 contactSection: {
  address: String,            
  phone: String,              
  email: String,              
  mapEmbedUrl: String         // رابط iframe لخريطة Google
},

 

  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
    youtube: String,
  }

}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
