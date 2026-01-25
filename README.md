# 🩺 Doctor Appointment Booking System - Admin

## This repository includes :

- **(Admin Panel)** From here the Admin can manage the appointments and doctors information and see statistics.

- **(Doctor Panel)** From here the Doctor can manage the appointments and see her/his earnings and statistics.

## 🚀 Features:

1. Admin Permissions:

- **Doctors Menagament:** Adding, Update Doctor Information.
- **Appointments Menagament:** See all appointments and change status them.
- **Statistics (Dashboard):** See the patients total and doctors and appointments.
- **Authentication (Admin Login):** Login System for Administrators using (JWT).

2. Doctor Permissions:

- **Doctors Menagament:** Update his/her Information.
- **Appointments Menagament:** Show all appointments and change status them.
- **Statistics (Dashboard):** See the patients total and earnings and appointments.
- **Authentication (Admin Login):** Login System for doctors Administrators using (JWT).

## 🛠️ Tech Stack:

- **React 19** (Vite)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Context API** To manage Token and Data
- **Axios** To connect with server.
- **React Toastify** For notification.

## ⚙️ Setup

1. Load Project:

```bash
git clone https://github.com/IbrahimFullStackWebDev/doctors-appointments-admin.git
```

2. Install packages:

```bash
npm install
```

3. Create a file in the root directory .env **(Environment Variables)** and add:

```bash
   VITE_BACKEND_URL=http://localhost:4000
```

4. Run the project:

```bash
npm run dev
```

## Related Repositories

- Frontend Repository https://github.com/IbrahimFullStackWebDev/doctors-appointments-frontend.git
- Backend Repository https://github.com/IbrahimFullStackWebDev/doctors-appointments-backend.git
