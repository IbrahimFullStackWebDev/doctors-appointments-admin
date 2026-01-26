# 🩺 Doctor Appointment Booking System (Admin & Doctor Panels)

A professional healthcare management solution built with React 19 and TypeScript. This repository contains the administrative side of the platform, featuring dual-role dashboards for clinic owners and medical staff.

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

- **Frontend** React 19 (Vite), TypeScript.
- **Styling** Tailwind CSS v4.
- **State Management** React Context API (Auth & Data persistence).
- **Networking** Axios (with Interceptors for JWT).
- **Feedback** React Toastify for real-time user notifications.

## 🔑 Demo Access (For Recruiters)

- To test the live functionality without creating an account:

* Admin Login: admin@gmail.com / strongPassword

* Doctor Login: richard@example.com / 123456789

* Doctor Login: emily@example.com / 123456789

* Doctor Login: andrew@example.com / 123456789

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
