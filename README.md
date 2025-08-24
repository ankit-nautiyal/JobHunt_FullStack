# 🧑‍💼 JobHunt – A Modern Full-Stack Web Job Portal

A **Full-Stack MERN-based Job Portal** where recruiters can post jobs and applicants can apply with many more features. Built with **React, Node.js, Express, MongoDB, Zod, and Tailwind + shadcn/ui, etc**.

---

## 🚀 Features 🌟

* 🔐 **Authentication & Authorization** (JWT + bcrypt)
* 👤 **Role-based access** – Recruiter & Applicant
* 🚫 **Protected Routes** – Applicant can't access admin/recruiter routes and vice versa
* 📄 **Job Listings** – A Recruiter can post, update, and delete jobs
* 📝 **Applications** – Apply for jobs with validation
* 🏢 **Register Companies** – Register companies as recruiter/admin & update company info
* 🧑🏻‍💻 **Admin Dashboard** – View, register & update companies, view & post job applications, change application status (Accepted/Rejected/Pending)
* ⌛ **Register Companies** – Register companies as recruiters, update company info, and see the registered companies table
* 🔍 **Search Company & Job** – Recruiter can search his/her registered company or posted job by company name or job role
* 🧑🏻‍💼 **Applicant Profile** – Access & update your profile, upload resume, see applied jobs table with application status, etc
* 💼 **Jobs Page** – Filter jobs on the jobs page based on location, role & salary range
* 🔍 **Search Bar & Category Carousel** – Search using the search bar or using the category carousel available on the hero section of the home page
* 🛡️ **Form Validations** - using **Zod** (frontend)
* 📲 **Responsive UI** - across all screen sizes with **React + Tailwind + shadcn/ui**
* ⚡ Hosted on **Render**

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* React Router for routing
* Redux & Redux Toolkit for state management
* Lucide-react to add consistent icons in React app
* Zod (form validation)
* TailwindCSS + shadcn/ui + Lucide React
* Vite for faster React app build-up
* Axios for making API requests
* Framer Motion for animations

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* MongoDB Atlas & MongoDB Compass for managing the databases 
* JWT for authentication
* Bcrypt.js to hash & verify passwords
* Dotenv for handling environment variables
* Cloudinary to store uploaded media on the cloud
* Cookie-parser to parse cookies sent with incoming HTTP requests
* Nodemon for faster dev experience
* Multer to handle uploads of type multipart/form-data
* cors to handle cross-origin requests
* dataUri to generate Data URI scheme
* cross-env to run scripts that set and use environment variables across platforms

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
### ⚙️ Project Structure


<img width="220" height="967" alt="image" src="https://github.com/user-attachments/assets/2d395c58-df7e-4767-a420-0819da9f233b" />



---

## 📸 Screenshots
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/344648c9-b2f3-4956-8dfe-e86f8a24b617" />
<img width="1916" height="1014" alt="image" src="https://github.com/user-attachments/assets/d08b308a-0a89-4acb-8dc6-54e8f15a2e07" />
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/38a5229c-d4bf-40c6-b59d-bfc58934229c" />
<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/27e28430-b713-4129-a604-94f97b51448b" />
<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/4e4d00cd-078a-4fb8-9158-db5c70dce42d" />


<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/39313fdd-8cc1-4f5f-86f6-306673ed1452" />

<img width="1919" height="1007" alt="image" src="https://github.com/user-attachments/assets/0171d870-811f-42cc-b54a-167711201bce" />

<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/3b861c09-c649-47fb-be05-3ac6f98f3b74" />

<img width="1914" height="1011" alt="image" src="https://github.com/user-attachments/assets/8ccf766f-fb52-4b24-89d9-8052787908a3" />

<img width="1916" height="1011" alt="image" src="https://github.com/user-attachments/assets/5449eba5-b61d-4666-91e8-9735fc2e505b" />

<img width="1916" height="1022" alt="image" src="https://github.com/user-attachments/assets/d6eeac53-a955-4bc3-b258-0d81c1c3fd36" />


<img width="1919" height="1006" alt="image" src="https://github.com/user-attachments/assets/684d77ed-83c0-451a-b574-1f9246348262" />

<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/c3f454f1-4f33-4647-a1c0-7219e260f00e" />
<img width="1919" height="1013" alt="image" src="https://github.com/user-attachments/assets/0f93240a-4e0d-402c-828a-5264031cbe07" />

<img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/ee5fc829-d509-4c98-b656-cf5141cb8902" />
<img width="1916" height="1021" alt="image" src="https://github.com/user-attachments/assets/7568dbdf-6ba4-4112-91e6-b65e5b50edc0" />



<img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/ec1bad88-dc8a-4944-89d6-274163a02b96" />

<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/37531a87-a069-4bf3-af36-ff7c8c7a4819" />

<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/556577c9-5a2e-42b4-8d89-9018c911e4a3" />

<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/229de94f-4502-4d26-accf-e6bbd7b797fb" />


<img width="1919" height="1013" alt="image" src="https://github.com/user-attachments/assets/2bb0f56b-459a-46d9-b695-8866734498c0" />

<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/2f1d7ab4-fdad-4b2f-849d-14c1160234e3" />

<img width="1919" height="1025" alt="image" src="https://github.com/user-attachments/assets/4db13182-e813-4b14-aaeb-3884f8944c84" />

<img width="1917" height="1021" alt="image" src="https://github.com/user-attachments/assets/406812a1-680a-4c27-8ef8-0f1ea954d1c1" />

<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/72b42095-fd13-4725-9638-c2751a30e838" />


<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/4be7f4a8-02b5-4517-bb81-5b6a2aba13e3" />


<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/27a33061-99a6-4ceb-8212-0ee497eb0aae" />

<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/4ba957e8-5184-4ca0-a333-1d3635abe2e7" />

<img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/df2fa633-706d-44bf-bcab-667266fc6da5" />


<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/118c1330-1b3a-4557-8298-4c4dd485ab06" />


<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/8aae8379-0dd4-4b55-ac2c-6393b40e1175" />



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

## 🧑🏻‍💻 Author

- Name: Ankit Nautiyal
- Contact: nautiyalankit65@gmail.com

