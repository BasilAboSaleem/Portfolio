# 🧑‍💻 Personal Portfolio with Admin Dashboard

This is a **full-stack dynamic portfolio website** built using **Node.js**, **Express**, **MongoDB**, and **EJS**.  
The project includes a fully dynamic homepage and a secured **admin dashboard** to manage all sections of the site, inspired by the **iPortfolio** template and styled with **SB Admin 2** in the backend panel.

---

## 🚀 Project Purpose

The goal of this project is to showcase your personal portfolio in a professional and maintainable way — with an admin dashboard that enables full control over each content section **without touching the codebase**.

---

## ✨ Features

- 🔐 Secure login-protected admin panel  
- 🎯 Fully dynamic homepage content  
- 📁 CV upload and download support (PDF/DOCX)  
- 🧑 Add and update personal bio & about section  
- 🧠 Manage skills with icons grid  
- 🗂️ Manage resume items (education, experience)  
- 🎨 Add portfolio projects with images and descriptions  
- 🛠️ Manage offered services  
- 💬 Add testimonials from clients  
- 📩 Manage contact info  
- ⚙️ General site settings (titles, social links)  
- 🌐 SEO-friendly, responsive & clean design  
- 📦 Follows MVC structure (Models, Views, Controllers)  

---

## 🛠️ Stack Used

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Backend     | Node.js, Express.js                     |
| Frontend    | EJS, Bootstrap                          |
| Database    | MongoDB + Mongoose                      |
| Auth        | express-session + connect-mongo         |
| Uploads     | Multer + Cloudinary                     |
| Styling     | SB Admin 2 (for dashboard) + iPortfolio |

---

## 📋 Admin Dashboard Sections

The admin panel is structured with two main categories:

### 📂 Portfolio Content

Manage all user-visible data on the homepage:

- **About Me** – Your personal bio, image, and info  
- **Manage CV** – Upload, update, and download your resume  
- **Skills** – Add/edit/delete your technical skills with icons  
- **Resume** – Manage timeline of education and experience  
- **Portfolio** – Showcase your projects with images and details  
- **Services** – List of services you offer  
- **Testimonials** – Client feedback and reviews  
- **Contact Info** – Email, phone, address, etc.  

### ⚙️ Settings

Customize overall site identity and access:

- **General Settings** – Site title, description, welcome message, and social media links  
- **Logout** – Ends the admin session  

---

## 🧾 CV Upload Feature

The **Manage CV** section in the dashboard allows admins to upload and update a personal resume.  
Key aspects of this feature include:

- ✅ Supports **PDF**, **DOC**, and **DOCX** formats  
- ✅ Uploaded files are stored securely via **Cloudinary** as `raw` resources  
- ✅ Visitors on the homepage can **view or download** the latest resume directly via a button in the **About** section  
- ✅ Admins see the current uploaded file with a link, along with the option to upload a new one  

> This feature improves professionalism and allows easy updating of CVs without modifying code.

---

## 🔐 Authentication & Security

- Access to the dashboard is **restricted to authenticated admins only**  
- Sessions are securely stored using **MongoDB** with `connect-mongo`  
- Flash messages provide **user-friendly feedback** (e.g., “CV uploaded”, “Settings updated”, etc.)  
- All sensitive routes are protected to prevent unauthorized access  

---

## 🧠 Customization & Extensibility

- Clean and modular **MVC structure** for easy scalability  
- All dynamic content can be updated through the dashboard **without changing the codebase**  
- Well-designed schema allows future enhancements like:
  - 📝 Blog posts
  - 🌍 Multilingual support
  - 📬 Contact form with backend integration

---

## 📣 Final Notes

This project is ideal for **developers**, **freelancers**, or **creatives** who want to present their work professionally and keep their content up-to-date without redeploying.  
Built with flexibility, maintainability, and real-world usability in mind.

> Created with ❤️ by **Basil Abo Saleem**

## 🌍 Developer Context (Optional Personal Note)

This platform was fully developed under **extremely difficult conditions during the war in Gaza**, amid **displacement**, **power outages**, and **severe resource limitations**.  
Despite these challenges, I committed to **learning** and **building** a real-world full-stack project to demonstrate my **skills**, **dedication**, and **perseverance**.

> Thank you for visiting my portfolio. Every line of code represents not just technical knowledge, but a journey through adversity.