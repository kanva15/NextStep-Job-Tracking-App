[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# NextStep — Job Tracker & LinkedIn Saver

An all-in-one job tracking web app and Chrome extension.  
Keep track of your applications (Applied, Interview, Offer, Rejected) and save LinkedIn jobs directly to your tracker with one click.

---

## 🚀 Features

- **Full-stack Job Tracker**  
  - User registration & login (JWT)  
  - Add / Edit / Delete jobs with company, position, notes & status  
  - Summary dashboard (counts by status)  
  - Filter by status  
  - Responsive UI built with React, Vite & Bootstrap

- **LinkedIn Job Saver Extension**  
  - Auto-detect open LinkedIn job title & company  
  - Choose application status and “Save” right from the popup  
  - Sends your saved job to the same backend  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose  
- **Frontend**: React, Vite, Bootstrap, Axios, React Router  
- **Auth**: JSON Web Tokens  
- **Extension**: Chrome Extension APIs (Manifest v3), content scripts, popup  

---

## 📦 Folder Structure

```
.
├── linkedin-job-extension/ # Chrome extension
│ ├── manifest.json
│ ├── background.js
│ ├── content.js
│ ├── popup.html
│ └── popup.js
├── job-tracker-frontend/ # React + Vite frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/ # logo, icons
│ │ ├── api/ # axios / fetch wrappers
│ │ ├── components/ # shared UI components
│ │ └── pages/ # Login, Register, Dashboard
│ ├── index.html
│ └── vite.config.js
├── config/ # App configuration
│ └── db.js # MongoDB connection
├── models/ # Mongoose schemas
│ ├── Application.js
│ └── User.js
├── routes/ # Express route handlers
│ ├── applications.js
│ └── auth.js
├── server.js # Express entrypoint
├── package.json
└── .env # Environment variables
```
---

## 🔧 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Chrome** (for extension)

### 1. Clone & Install

```bash
git clone https://github.com/kanva15/NextStep---Job-Tracking-App.git
cd NextStep---Job-Tracking-App

Backend:
cd server
npm install

Create a .env in server/:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Start backend:
npm run dev

Frontend:
cd job-tracker-frontend
npm install
npm run dev

By default, it runs on http://localhost:5173 (make sure CORS is allowed for your extension).
```

2. Load Chrome Extension
   -> Open chrome://extensions/
   -> Enable Developer mode.
   -> Click Load unpacked and select linkedin-job-extension/.
   -> Pin the extension and test on any LinkedIn job view page.


## 🤝 Contributing
1. Fork the repo
2. Create your feature branch (git checkout -b feature/XYZ)
3. Commit your changes (git commit -am 'Add XYZ')
4. Push to the branch (git push origin feature/XYZ)
5. Open a Pull Request

## 📄 License
This project is MIT Licensed. Feel free to use and modify!

Happy job hunting! 🚀
next step toward your dream career

Feel free to tweak any section to suit your repository style or add badges (CI, coverage, etc.).
