const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({

  heroSection: {
    name: String,
    jobTitle: String,
    welcomeMessage: String,
    backgroundImage: String,
  },

  aboutSection: {
    title: String,
    content: String,
    profileImage: String,
    birthday: String,
    website: String,
    phone: String,
    city: String,
    age: Number,
    degree: String,
    email: String,
    freelance: String,
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
      percentage: Number
    }
  ],

  resumeSection: {
    education: [
      {
        title: String,
        from: String,
        to: String,
        description: String
      }
    ],
    experience: [
      {
        title: String,
        from: String,
        to: String,
        description: String
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

  testimonialsSection: [
    {
      name: String,
      image: String,
      content: String
    }
  ],

  contactSection: {
    location: String,
    email: String,
    phone: String,
    mapEmbed: String
  },
  cv: {
  fileUrl: String,
  fileName: String
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
