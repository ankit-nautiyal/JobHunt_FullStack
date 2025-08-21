

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
<img width="1916" height="1014" alt="image" src="https://github.com/user-attachments/assets/d08b308a-0a89-4acb-8dc6-54e8f15a2e07" />
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/38a5229c-d4bf-40c6-b59d-bfc58934229c" />
<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/27e28430-b713-4129-a604-94f97b51448b" />

<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/39313fdd-8cc1-4f5f-86f6-306673ed1452" />

<img width="1919" height="1007" alt="image" src="https://github.com/user-attachments/assets/0171d870-811f-42cc-b54a-167711201bce" />

<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/3b861c09-c649-47fb-be05-3ac6f98f3b74" />

<img width="1914" height="1011" alt="image" src="https://github.com/user-attachments/assets/8ccf766f-fb52-4b24-89d9-8052787908a3" />

<img width="1916" height="1011" alt="image" src="https://github.com/user-attachments/assets/5449eba5-b61d-4666-91e8-9735fc2e505b" />

<img width="1916" height="1022" alt="image" src="https://github.com/user-attachments/assets/d6eeac53-a955-4bc3-b258-0d81c1c3fd36" />

<img width="1919" height="1013" alt="image" src="https://github.com/user-attachments/assets/0f93240a-4e0d-402c-828a-5264031cbe07" />

<img width="1919" height="1006" alt="image" src="https://github.com/user-attachments/assets/684d77ed-83c0-451a-b574-1f9246348262" />

<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/c3f454f1-4f33-4647-a1c0-7219e260f00e" />

<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/25262874-8135-45a7-94d4-e706b5fdb299" />

<img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/44697de5-0bda-4936-85b8-be237f186b05" />

<img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/ec1bad88-dc8a-4944-89d6-274163a02b96" />

<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/37531a87-a069-4bf3-af36-ff7c8c7a4819" />

<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/556577c9-5a2e-42b4-8d89-9018c911e4a3" />

<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/229de94f-4502-4d26-accf-e6bbd7b797fb" />









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

