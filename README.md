

# 🧑‍💼 JobHunt – A Modern Full-Stack MERN-based Job Portal

A **Full-Stack MERN-based Job Portal** where recruiters can post jobs and applicants can apply with many more features. Built with **React, Node.js, Express, MongoDB, Zod, and Tailwind + shadcn/ui**.

---

## 🚀 Features

* 🔐 **Authentication & Authorization** (JWT + bcrypt)
* 👤 **Role-based access** – Recruiter & Applicant
* 📄 **Job Listings** – Post, update, and delete jobs
* 📝 **Applications** – Apply for jobs with validation
* ✅ **Form Validation** using **Zod** (frontend)
* 🎨 **Responsive UI** with **React + Tailwind + shadcn/ui**
* ⚡ Hosted on **Render**

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* React Router
* Zod (form validation)
* TailwindCSS + shadcn/ui + Lucide React

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT for authentication

**Hosting:**

* Render

---

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/ankit-nautiyal/JobHunt_FullStack.git
cd jobhunt
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` and add:

```env
PORT=8000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret
```

Start backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

---

## 📸 Screenshots
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/344648c9-b2f3-4956-8dfe-e86f8a24b617" />


---

## 🛡️ Validation with Zod

Example: Password validation

```js
password: z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be under 64 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
    "Password must include uppercase, lowercase, number & special character"
  )
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR.


---

