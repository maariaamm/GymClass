# GymClass – Gym Booking System

GymClass is a fullstack web application for managing gym classes, bookings, and users.  
It includes authentication, role-based authorization, and CRUD functionality for users, classes, and bookings.

---

- Visit my deployed site -> https://bright-kringle-8f2296.netlify.app/
- My RESTful API link -> https://gymclass.onrender.com

## Tech Stack

**Backend**

- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt

**Frontend**

- React
- CSS

---

## API DOCUMENTATION

## 1. Authentication / User Endpoints

| Method | Endpoint       | Role / Access      | Description                    |
| ------ | -------------- | ------------------ | ------------------------------ |
| POST   | /auth/register | Public             | Create a new user account      |
| POST   | /auth/login    | Public             | Log in and receive a JWT token |
| GET    | /auth/me       | Authenticated user | Get own user profile           |
| GET    | /auth/         | Admin              | Get all users                  |
| PUT    | /auth/:id      | Admin or self      | Update user data               |
| DELETE | /auth/:id      | Admin              | Delete a user                  |

---

## 2. Classes

| Method | Endpoint     | Role / Access       | Description          |
| ------ | ------------ | ------------------- | -------------------- |
| GET    | /classes     | Authenticated users | Get all classes      |
| GET    | /classes/:id | Authenticated users | Get a specific class |
| POST   | /classes     | Admin / Trainer     | Create a new class   |
| PUT    | /classes/:id | Admin / Trainer     | Update a class       |
| DELETE | /classes/:id | Admin / Trainer     | Delete a class       |

---

## 3. Bookings

| Method | Endpoint      | Role / Access       | Description      |
| ------ | ------------- | ------------------- | ---------------- |
| POST   | /bookings     | Authenticated users | Book a class     |
| GET    | /bookings/my  | Authenticated users | Get own bookings |
| DELETE | /bookings/:id | Booking owner only  | Cancel a booking |

---
