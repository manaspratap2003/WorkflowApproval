<div align="center">

# 🚀 Workflow Approval System

### Enterprise Workflow & Approval Management Platform

A modern **ASP.NET Core + .NET 10** workflow approval application designed for managing projects, tasks, approvals, files and collaboration through secure role-based access.

---

![.NET](https://img.shields.io/badge/.NET-10.0-purple?style=for-the-badge)
![ASP.NET](https://img.shields.io/badge/ASP.NET-Core-blue?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

</div>

---

# 📖 Overview

Workflow Approval System is a complete enterprise-grade workflow management solution built using **ASP.NET Core MVC**, **.NET 10**, **Entity Framework Core**, and **MySQL**.

The application allows organizations to create projects, assign tasks, manage approvals, upload files, and collaborate securely using role-based authentication.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- BCrypt Password Hashing
- Session Management
- Cookie Authentication
- Role-Based Authorization

---

## 📁 Project Management

- Create Projects
- Update Status
- Delete Projects
- Assign Owners
- Track Workflow

---

## ✅ Task Management

- Create Tasks
- Assign Priority
- Task Status Tracking
- Delete Tasks
- Inline Task Comments

---

## 👍 Approval Workflow

- Request Approval
- Approve
- Reject
- Request Changes
- Approval History

---

## 💬 Collaboration

- Project Comments
- Task Comments
- Threaded Discussions

---

## 📂 File Management

- Upload Files
- Download Files
- Image Preview
- File Versioning

---

## 📜 Logging

- Serilog Logging
- Request Logging Middleware
- Exception Middleware
- Startup Logging

---

# 🏗 Architecture

```
                    +----------------+
                    |   Browser      |
                    +-------+--------+
                            |
                     ASP.NET MVC UI
                            |
                 HttpClient + JWT
                            |
                    +-------▼--------+
                    |   Web API      |
                    +-------+--------+
                            |
                     Service Layer
                            |
                   Entity Framework Core
                            |
                    +-------▼--------+
                    |     MySQL      |
                    +----------------+
```

---

# 📂 Project Structure

```
WorkFlowAPI
│
├── Controllers
├── Services
│   ├── Interfaces
│   └── Implementations
├── DTOs
├── Models
├── Data
├── Middleware
├── Helpers
├── Migrations
├── wwwroot
└── Program.cs

WorkflowApprovalUI
│
├── Controllers
├── Views
├── Models
├── Services
├── wwwroot
└── Program.cs
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| ASP.NET Core MVC | Frontend |
| .NET 10 | Backend |
| Entity Framework Core | ORM |
| MySQL | Database |
| JWT | Authentication |
| BCrypt | Password Hashing |
| Serilog | Logging |
| Swagger | API Documentation |

---

# 👥 User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full Access |
| Manager | Manage Projects & Tasks |
| Designer | Submit Approval Requests |
| Reviewer | Review Approvals |
| Client | Final Approval |

---

# 🔐 Authentication Flow

```
User Login

     │

     ▼

MVC Login Page

     │

     ▼

POST /api/auth/login

     │

     ▼

Password Verification

     │

     ▼

JWT Generated

     │

     ▼

JWT Stored in Session

     │

     ▼

Bearer Token Attached

     │

     ▼

Protected APIs
```

---

# 📊 Database

Main Tables

- Users
- Projects
- WorkflowTasks
- TaskComments
- Comments
- UploadedFiles
- Approvals

---

# 🔄 Workflow Lifecycle

```
Draft

   │

   ▼

In Progress

   │

   ▼

In Review

   │

   ▼

Approved

   │

   ▼

Completed
```

---

# 📦 Installation

Clone Repository

```bash
git clone https://github.com/Devrajjj-14/WorkFlowApprovalSys.git
```

Backend

```bash
cd WorkFlowAPI
dotnet restore
dotnet run
```

Frontend

```bash
cd WorkflowApprovalUI
dotnet restore
dotnet run
```

---

# ⚙ Configuration

Database

```
Server=localhost
Database=workflow_approval_db
User=root
Password=Root123@
```

API

```
http://localhost:5000
```

MVC

```
http://localhost:5001
```

---

# 📚 API Endpoints

## Authentication

```
POST /api/auth/login
POST /api/auth/register
```

## Projects

```
GET /api/projects
POST /api/projects
PUT /api/projects/{id}
DELETE /api/projects/{id}
```

## Tasks

```
POST /api/tasks
PUT /api/tasks/{id}
DELETE /api/tasks/{id}
```

## Approvals

```
POST /api/approvals
PUT /approve
PUT /reject
PUT /changes
```

## Files

```
Upload
Download
List
```

---

# 📜 Logging

Uses **Serilog**

- Console Logs
- File Logs
- Request Logs
- Exception Logs

Location

```
logs/
    Custom Serilogger logs.log
```

---

# 🔒 Security

- JWT Authentication
- Role Authorization
- Password Hashing
- Secure Middleware Pipeline
- Exception Handling
- CORS Protection

---

# 🚀 Future Improvements

- AI Assisted Workflow
- Email Notifications
- SignalR Real-time Updates
- Dashboard Analytics
- Audit Logs
- Docker Support
- Kubernetes Deployment
- Azure Hosting

---

# 📷 Screenshots

```
Add screenshots here

/docs/login.png

/docs/dashboard.png

/docs/project.png

/docs/tasks.png
```

---

# 🤝 Contributing

1. Fork Repository

2. Create Feature Branch

3. Commit Changes

4. Push Branch

5. Open Pull Request

---

# 📄 License

MIT License

---

<div align="center">

## 👨‍💻 Developed By

**Manas Pratap Singh**

.NET Developer

⭐ Star this repository if you found it useful.

</div>
