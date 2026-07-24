# LeadDesk Mini

A full-stack MERN application designed for capturing client inquiries and managing them through a secure administrative dashboard. Built as a comprehensive full-stack web development training project, featuring a modern UI, robust backend architecture, and seamless cloud deployment.

---

## 🚀 Features

- **Public Landing Page:** A responsive, dark-mode-optimized form for potential clients to submit project inquiries.
- **Secure Authentication:** Protected admin routes utilizing JSON Web Tokens (JWT) and bcrypt password hashing.
- **Admin Dashboard:** A centralized interface to view all submitted leads, featuring real-time client-side search filtering.
- **Status Management:** Instant status toggling (New, Contacted, Closed) via database PATCH requests.
- **Cloud Deployment:** Fully deployed using Vercel (Frontend) and Render (Backend).

---

## 🛠️ Tech Stack

**Frontend:**

- React (scaffolded with Vite)
- Tailwind CSS (v4)
- React Router DOM (for SPA routing)
- Axios (for API requests)

**Backend:**

- Node.js & Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT) for session management
- Bcrypt.js for credential security

---

## 🗄️ Database Schema

The application uses MongoDB with two primary collections:

### 1. Lead Model

Stores the inquiries submitted from the public landing page.

- `name` (String, Required) - Full name of the prospect.
- `email` (String, Required) - Contact email address.
- `budgetRange` (String, Required) - Selected budget tier.
- `message` (String, Required) - Project details.
- `status` (String, Default: 'New') - Enum: ['New', 'Contacted', 'Closed'].
- _Timestamps are enabled for createdAt/updatedAt._

### 2. Admin Model

Stores the administrative credentials for dashboard access.

- `username` (String, Required, Unique)
- `password` (String, Required) - Hashed via bcrypt prior to saving.

---

## 💻 Local Setup & Installation

To run this project locally, you will need Node.js and a MongoDB cluster (like MongoDB Atlas) set up.

**1. Clone the repository**

```bash
git clone https://github.com/sunny-rajak/digital-heroes-leaddesk.git
cd digital-heroes-leaddesk
```

**2. Backend Setup**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
NODE_ENV=development
```

Seed the initial admin user and start the server:

```bash
node seedAdmin.js
npm run dev
```

**3. Frontend Setup**

Open a new terminal window:

```bash
cd client
npm install
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 👨💻 Author

**Sunny Rajak** — MERN Stack Developer
