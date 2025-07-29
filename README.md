#  Full Stack Web Application

This is a full-stack web application built with **React.js** on the frontend and **Spring Boot** on the backend. It uses **MongoDB Atlas** for database storage and is secured using **Spring Security**. The frontend is on the `main` branch, and the backend is maintained on a separate `backend` branch.

---

##  Branch Structure

- `main` → React frontend
- `backend` → Spring Boot backend

---

##  Tech Stack

###  Frontend (`main` branch)
- React.js
- Bootstrap 5
- Axios
- React Router DOM

###  Backend (`backend` branch)
- Spring Boot
- Spring Web
- Spring Security
- Spring Data MongoDB
- RESTful APIs

###  Database
- MongoDB Atlas (Cloud-hosted NoSQL)

---

##  Getting Started

### 1 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
````
---
### 2 Frontend Setup (React.js)
```bash
git checkout main
cd frontend-folder-name
npm install
npm start
````
---
### 3 Backend Setup (Spring Boot)
````bash
git checkout backend
cd backend-folder-name
````
- Configure application.properties
````bash
server.port=8080

spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db-name?retryWrites=true&w=majority
spring.data.mongodb.database=your-db-name

spring.security.user.name=admin
spring.security.user.password=admin123
````
---
###  Security
- Authentication via Spring Security
- Passwords stored securely (e.g., BCrypt)
- Login, logout, and protected API routes
---
### Features
- Secure Login & Registration
- JWT or Session-based Auth
- CRUD operations (MongoDB)
- Responsive UI with Bootstrap
- React Router for navigation
- Form validation and error handling
---
# 🙋‍♂️ Author
## Rahulkumar C
### Email: rahulkumarc679@gmail.com
### Phone: +91 8870822514
### GitHub: https://github.com/Rahulkumar-06




