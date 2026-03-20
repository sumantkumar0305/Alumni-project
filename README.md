# 🎓 Alumnexus

### A Full-Stack Alumni Management System built with the MERN Stack

**Alumnexus is a web-based platform designed to connect students with alumni of the same college for mentorship, internships, job referrals, networking, and community engagement.**

![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Server-Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens)

---

## 📌 Table of Contents

- [📖 About the Project](#-about-the-project)
- [🎯 Project Motivation](#-project-motivation)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🧑‍💼 Role-Based Access](#-role-based-access)
- [🌟 Why This Project Matters](#-why-this-project-matters)
- [📸 Future Improvements](#-future-improvements)
- [👤 Author](#-author)


---

## 📖 About the Project

**Alumnexus** is a full-stack **Alumni Management System** developed using the **MERN Stack** to solve a very common problem faced in many colleges:

> Students often do not know who their alumni are, where they are working, or how to connect with them for guidance, mentorship, internships, and placements.

This platform creates a strong connection between **students**, **alumni**, and **admin** by providing a centralized system where:

- Students can discover alumni from their own college
- Alumni can help students through mentorship and referrals
- Admin can manage student and alumni records
- The college can organize events and strengthen alumni engagement

---

## 🎯 Project Motivation

The main motive of this project is to solve a real problem that is common in many colleges.

In many institutions, students face difficulty in:

- Connecting with alumni who have already been placed
- Getting internship opportunities
- Asking for placement referrals
- Receiving career guidance from seniors
- Knowing where alumni are currently working

To solve this problem, **Alumnexus** provides a dedicated platform where students can directly interact with alumni of their own college.

### How it works:

- A **separate database** is maintained for:
  - **Students**
  - **Alumni**
  - **Admin**

- The **Admin** manages user records and plays an important role:
  - When a current student graduates and gets placed or leaves the college,
  - The admin can **shift that student from the Student database to the Alumni database**

This helps the system stay updated and ensures that current students always know:

- Who their alumni are
- What they are doing now
- Where they are working
- How to connect with them (for example, through **LinkedIn**)

### Alumni can support students by:

- Providing **internship opportunities**
- Sharing **job referrals**
- Becoming **mentors**
- Guiding students in placements and career growth
- Participating in and conducting **college events**
- Donating to the college for growth and development

In short, **Alumnexus builds a bridge between students and alumni** and creates a stronger academic and professional community within the college.

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🔐 **Role-Based Authentication** | Separate login and access for **Student**, **Alumni**, and **Admin** using JWT authentication |
| 👨‍🎓 **Student Portal** | Students can browse alumni, jobs, internships, events, and connect for guidance |
| 🧑‍💼 **Alumni Portal** | Alumni can update their details, offer mentorship, share referrals, and help students |
| 🛠️ **Admin Management** | Admin can manage users and move graduated students into the alumni system |
| 👥 **Alumni Directory** | Students can view alumni details and connect through LinkedIn |
| 💼 **Job Board** | Alumni/Admin can post placement opportunities for students |
| 🧑‍💻 **Internship Board** | Students can explore internships shared by alumni |
| 🤝 **Mentorship Program** | Alumni can register as mentors to guide juniors |
| 🗓️ **Event Management** | Create, browse, register, and manage college events |
| 💰 **Donation System** | Alumni can contribute donations to support the college |
| 📬 **Alert Notifications** | In-app animated alerts for actions like registration, posting, and updates |

---

## 🛠️ Tech Stack

### Frontend
- **React 18**
- **React Router DOM**
- **Material UI (MUI) v5**
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **Multer**
- **CORS**
- **Helmet**
- **express-rate-limit**

### Architecture
- **MERN Stack**
- **RESTful CRUD APIs**

---

## 📁 Project Structure

```bash
Alumnexus/
│
├── frontend/
│   └── src/
│       ├── Components/
│       │   ├── AddForm/
│       │   ├── Donate/
│       │   ├── EngageHub/
│       │   │   ├── EventPage.js
│       │   │   ├── EventPage/
│       │   │   │   ├── EventCard.jsx
│       │   │   │   ├── EventsHeader.jsx
│       │   │   │   ├── ParticipantsDialog.jsx
│       │   │   │   ├── ParticipantDetailDialog.jsx
│       │   │   │   └── hooks/
│       │   │   │       ├── useEvents.js
│       │   │   │       └── useParticipants.js
│       │   │   └── RelatedForm/
│       │   │       └── EventRegisterForm.jsx
│       │   ├── Mentorship/
│       │   │   └── MentorshipPage.jsx
│       │   └── Utils/
│       │       └── AlertMessage.jsx
│       └── middleware.js
│
└── backend/
    ├── controllers/
    │   ├── authController.js
    │   ├── alumniController.js
    │   ├── donationController.js
    │   ├── eventController.js
    │   ├── internshipController.js
    │   └── jobController.js
    ├── models/
    │   ├── Alumni.js
    │   ├── Admin.js
    │   ├── Student.js
    │   ├── Event.js
│   │   ├── Internship.js
│   │   ├── Job.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── internshipRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── donationRoutes.js
│   │   └── mentorRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js v18+**
- **MongoDB** (Local or MongoDB Atlas)
- **npm**

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory and add the required environment variables.

Then run:

```bash
npm run dev
```

Backend will start at:

```bash
http://localhost:5000
```

---

### 3️⃣ Setup the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```bash
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
```

> ⚠️ **Important:** Never commit your `.env` file to GitHub.  
> Add `.env` to your `.gitignore`.

---

## 🧑‍💼 Role-Based Access

| Feature | Student | Alumni | Admin |
|--------|:-------:|:------:|:-----:|
| Browse Alumni Directory | ✅ | ✅ | ✅ |
| Browse Events | ✅ | ✅ | ✅ |
| Register for Events | ✅ | ✅ | ✅ |
| Create Events | ❌ | ✅ | ✅ |
| View Participants | ❌ | ✅ (Own Events) | ✅ |
| Browse Jobs & Internships | ✅ | ✅ | ✅ |
| Post Jobs & Internships | ❌ | ✅ | ✅ |
| Mentorship (as Mentor) | ❌ | ✅ | ❌ |
| Donate to College | ❌ | ✅ | ❌ |
| Move Student to Alumni | ❌ | ❌ | ✅ |

---

## 🌟 Why This Project Matters

This is not just a basic CRUD project.

**Alumnexus** solves a real-world college-level problem by building a system where:

- Students can directly connect with successful alumni
- Alumni can give back to their college community
- Admin can maintain updated records of students and graduates
- The college can create a stronger professional network for future batches

### This project demonstrates:

- Full-stack MERN development
- Role-based authentication & authorization
- Multiple user models and workflows
- Real-world database separation for Students, Alumni, and Admin
- CRUD operations with protected routes
- Modular React component architecture
- Secure backend practices
- Practical problem-solving through software

> 💼 A strong portfolio project that shows both **technical implementation** and **real-world impact**.

---

## 📸 Future Improvements

Some enhancements that can make **Alumnexus** even better:

- 📧 Email notifications for events and mentorship requests
- 💬 Real-time chat between students and alumni
- 📄 Resume upload for student profiles
- 📊 Admin dashboard with analytics
- 🔍 Advanced search and filtering
- ☁️ Cloud image/file storage (Cloudinary / Firebase / AWS S3)
- 💳 Real payment gateway integration for donations
- 🌐 Deployment with Docker and CI/CD

---

## 👤 Author

**Your Name**

- GitHub: https://github.com/sumantkumar0305
- LinkedIn: https://www.linkedin.com/in/sumant-kumar-dev/


---

### ❤️ Built to strengthen the connection between students and alumni

**If you found this project useful, consider giving it a ⭐ on GitHub!**
