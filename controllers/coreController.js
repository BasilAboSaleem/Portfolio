const nodemailer = require('nodemailer');

exports.index_get = (req, res) => {
    res.render('index');
};

exports.contact_post = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log("Contact form data:", { name, email, subject, message });

    // Validate input
    if (!name || !email || !subject || !message) {
      req.flash("error", "Please fill in all required fields.");
      return res.status(400).redirect('/');
    }

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    req.flash('success', 'Your message has been sent successfully!');
    return res.redirect('/');
  } catch (error) {
    console.error("Error in contact_post:", error);
    req.flash("error", "Something went wrong. Please try again later.");
    return res.status(500).redirect('/');
  }
};

exports.dashboard_get = (req, res) => {
    res.render('dashboard', { user: req.user });
};