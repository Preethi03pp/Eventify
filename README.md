# 🎉 Eventify – Smart Event Scheduling & RSVP Platform

**Eventify** is a full-stack web application designed to simplify event creation, management, and participation. It allows users to schedule events, send email invites, and manage RSVPs through a clean and intuitive interface.

---

## 🚀 Features

- ✅ Create and schedule events with title, description, location, and timing
- ✅ View all upcoming events in a card layout
- ✅ Send email invites to participants
- ✅ RSVP for events via a public link
- ✅ Admin dashboard for managing RSVPs
- ✅ Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

### 🔹 Frontend:
- React.js
- Vite
- Axios
- Tailwind CSS
- React Router

### 🔹 Backend:
- Spring Boot
- Spring Data JPA
- JavaMailSender (for emails)
- H2 Database (in-memory)

---

## ⚙️ Setup Instructions

### 🖥️ Backend (Spring Boot)
# Navigate to the backend folder
cd eventease-backend/

# Start the application
./mvnw spring-boot:run


### 🌐 Frontend (React)
# Navigate to the frontend folder
cd eventease-frontend/

# Install dependencies
npm install

# Start the React app
npm run dev


### Email Configuration (Backend)
To enable email invites, add this in application.properties:

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
### Use a Google App Password (not your real password).

📄 License
MIT License © 2025 Preethi P Palankar

💌 Connect
GitHub: @Preethi03pp
Email: preetippalankar@gmail.com
