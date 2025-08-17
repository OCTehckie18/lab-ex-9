```markdown
# 🚀 User Registration Web Application



![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

*A modern full-stack web application for user registration with profile picture upload, email confirmation, and complete CRUD operations.*

[🚀 Demo](#demo) • [📋 Features](#features) • [⚡ Quick Start](#quick-start) • [📖 API Documentation](#api-documentation)



---

## 📋 Features

### 🎯 Core Functionality
- ✅ **User Registration** with form validation
- ✅ **Profile Picture Upload** using Multer (local storage)
- ✅ **Email Confirmation** with HTML templates via Nodemailer
- ✅ **Complete CRUD Operations** (Create, Read, Update, Delete)
- ✅ **REST API Endpoints** for all user operations
- ✅ **Real-time Notifications** with success/error feedback

### 🎨 User Interface
- ✅ **Responsive Design** with TailwindCSS
- ✅ **Interactive Modal** for editing users
- ✅ **Image Preview** for profile pictures
- ✅ **Loading States** and animations
- ✅ **Modern UI/UX** with gradient backgrounds and smooth transitions

### 🔧 Technical Features
- ✅ **File Validation** (image types, size limits)
- ✅ **Duplicate Email Prevention**
- ✅ **Error Handling** and logging
- ✅ **Environment Configuration**
- ✅ **Development Tools** (Nodemon, hot reload)

---

## 🛠️ Technology Stack

| **Frontend** | **Backend** | **Database** | **Other** |
|:---:|:---:|:---:|:---:|
| HTML5 | Node.js | MySQL | Multer |
| TailwindCSS | Express.js | mysql2 | Nodemailer |
| Vanilla JavaScript | REST API | - | Nodemon |

---

## ⚡ Quick Start

### 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)
- **Gmail Account** with 2FA enabled for email functionality

### 🚀 Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/user-registration-app.git
   cd user-registration-app
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Create environment file**
   ```
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=user_db
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

5. **Setup MySQL Database**
   ```
   CREATE DATABASE user_db;
   ```

6. **Setup Gmail App Password**
   - Enable 2-Factor Authentication on your Google account
   - Go to: Google Account → Security → App Passwords
   - Generate a new app password and use it in `EMAIL_PASS`

7. **Start the application**
   ```
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

8. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api/users
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|:---:|:---:|:---:|:---:|
| `GET` | `/` | Get all users | - |
| `GET` | `/:id` | Get user by ID | - |
| `POST` | `/` | Create new user | `FormData` |
| `PUT` | `/:id` | Update user | `FormData` |
| `DELETE` | `/:id` | Delete user | - |

### 📝 Request Examples

#### Register New User
```
curl -X POST http://localhost:3000/api/users \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=1234567890" \
  -F "profile_picture=@/path/to/image.jpg"
```

#### Get All Users
```
curl -X GET http://localhost:3000/api/users
```

#### Update User
```
curl -X PUT http://localhost:3000/api/users/1 \
  -F "name=John Smith" \
  -F "email=johnsmith@example.com" \
  -F "phone=0987654321"
```

#### Delete User
```
curl -X DELETE http://localhost:3000/api/users/1
```

### 📱 Response Format

```
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "profile_picture": "profile-1234567890.jpg"
  },
  "emailSent": true
}
```

---

## 🗂️ Project Structure

```
user-registration-app/
├── 📁 public/                 # Frontend files
│   ├── 📄 index.html         # Main HTML page
│   └── 📄 script.js          # Frontend JavaScript
├── 📁 routes/                # API routes
│   └── 📄 users.js           # User CRUD operations
├── 📁 config/                # Configuration files
│   └── 📄 database.js        # Database connection
├── 📁 middleware/            # Custom middleware
│   └── 📄 upload.js          # File upload handling
├── 📁 utils/                 # Utility functions
│   └── 📄 email.js           # Email service
├── 📁 uploads/               # Uploaded files storage
├── 📄 server.js              # Main server file
├── 📄 package.json           # Dependencies
├── 📄 .env                   # Environment variables
├── 📄 .gitignore            # Git ignore rules
└── 📄 README.md             # Documentation
```

---

## 🧪 Testing with Postman/Thunder Client

### Setup Collection

Import this Postman collection or test manually:


📊 Click to expand test scenarios

#### Test Scenario 1: User Registration
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/users`
- **Body**: `form-data`
  - `name`: "Alice Johnson"
  - `email`: "alice@example.com"
  - `phone`: "1234567890"
  - `profile_picture`: [Upload image file]

#### Test Scenario 2: Get All Users
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/users`

#### Test Scenario 3: Update User
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/users/1`
- **Body**: `form-data`
  - `name`: "Alice Smith"
  - `email`: "alicesmith@example.com"

#### Test Scenario 4: Delete User
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/users/1`



---

## 🎯 Features Showcase

### 📧 Email Template Preview
When a user registers, they receive a beautifully formatted email:

```



    Welcome to Our Platform!


    
        Welcome to Our Platform!
        Dear [User Name],
        Thank you for registering with us...
        
    


```

### 🖼️ File Upload Features
- **Supported formats**: JPG, JPEG, PNG, GIF
- **Size limit**: 5MB per file
- **Unique naming**: Prevents file conflicts
- **Validation**: Client and server-side checks

### 📱 Responsive Design
- **Mobile-first approach**
- **Tablet and desktop optimized**
- **Touch-friendly interface**
- **Accessible design patterns**

---

## 🚨 Troubleshooting


🔧 Common Issues & Solutions

### Email Not Sending
**Problem**: Registration emails not being sent
**Solutions**:
- ✅ Verify Gmail App Password is correct
- ✅ Check if 2FA is enabled on Google account
- ✅ Ensure correct email credentials in `.env`
- ✅ Check console for email service errors

### Database Connection Issues
**Problem**: Cannot connect to MySQL database
**Solutions**:
- ✅ Verify MySQL server is running
- ✅ Check database credentials in `.env`
- ✅ Ensure database `user_db` exists
- ✅ Test connection with MySQL Workbench

### File Upload Problems
**Problem**: Profile pictures not uploading
**Solutions**:
- ✅ Check `uploads/` folder permissions
- ✅ Verify file size is under 5MB
- ✅ Ensure file type is image format
- ✅ Check server logs for multer errors

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::3000`
**Solutions**:
```
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 [PID]

# Or use different port
PORT=3001 npm run dev
```



---

## 🚀 Deployment

### Local Development
```
npm run dev
```

### Production Build
```
npm start
```

### Environment Setup for Production
```
NODE_ENV=production
PORT=80
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test all endpoints before submitting
- Update documentation for new features

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **TailwindCSS** for the beautiful utility-first CSS framework
- **Nodemailer** for reliable email delivery
- **MySQL** for robust database management
- **Multer** for seamless file upload handling

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/user-registration-app)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/user-registration-app)
![GitHub issues](https://img.shields.io/github/issues/yourusername/user-registration-app)
![GitHub stars](https://img.shields.io/github/stars/yourusername/user-registration-app)

---



**⭐ Star this repository if you found it helpful!**

**Made with ❤️ and Node.js**


```

This README.md includes:

## 🎯 **Key Features:**
- **Professional layout** with badges, emojis, and clear sections
- **Comprehensive documentation** covering all aspects
- **Visual project structure** and file organization
- **Complete API documentation** with examples
- **Troubleshooting guide** for common issues
- **Testing instructions** for Postman/Thunder Client
- **Contribution guidelines** for open source collaboration
- **Deployment instructions** for production
- **Beautiful formatting** with collapsible sections

## 📋 **Sections Included:**
1. **Header** with badges and quick navigation
2. **Features showcase** with checkmarks
3. **Technology stack** table
4. **Installation guide** step-by-step
5. **API documentation** with curl examples
6. **Project structure** visualization
7. **Testing scenarios** for validation
8. **Troubleshooting** common issues
9. **Deployment** instructions
10. **Contributing** guidelines
11. **License** and acknowledgments

This README will make your project look **professional**, **comprehensive**, and **easy to understand** for anyone visiting your GitHub repository! 🚀

