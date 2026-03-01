# Nexora Digital 

A premium, futuristic digital agency website built with Node.js, Express, MongoDB, and Vanilla HTML/CSS/JS.

## Technology Stack

**Frontend:**
* Semantic HTML5
* Vanilla CSS3 (Custom BEM architecture, Variables, Scroll Animations)
* Vanilla JavaScript (ES6+, IntersectionObserver, Custom Cursors)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JWT Authentication & bcryptjs
* Nodemailer (SMTP email integration)
* Helmet, CORS, Express-Rate-Limit (Security)

---

## Folder Structure

```
NexoraDigital/
│
├── backend/
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # API endpoint logic (auth, blog, leads, etc.)
│   ├── middleware/     # Custom express middlewares (auth, error handler)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   ├── utils/          # Helper utilities (SendEmail)
│   ├── .env.example    # Example environment variables
│   └── server.js       # Main backend entry point
│
└── frontend/
    ├── css/            # CSS architecture (base, components, animations, specific pages)
    ├── js/             # Vanilla JS scripts (animations, routing logic, contact forms)
    ├── index.html      # Home Page
    ├── blog.html       # Blog Listing
    ├── portfolio.html  # Portfolio Grid View
    ├── contact.html    # Contact Form
    ├── admin.html      # Admin Dashboard View
    └── ...             # Other sub-pages
```

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB locally installed or a MongoDB Atlas URI string

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Make sure to fill out `MONGO_URI`, `JWT_SECRET`, and your `SMTP` credentials for the email service.*

4. Run the development server:
   ```bash
   npm run dev
   ```
   *The backend will start on `http://localhost:5000`.*

### 3. Frontend Setup
Because the frontend is pure HTML/CSS/JS, you can serve it using any static file server like Live Server (VS Code Extension), or `serve` via npm:
```bash
npx serve frontend
```

---

## Features Built
- **Futuristic UI/UX:** Custom animated cursor, smooth scroll reveals, dark theme aesthetic with neon accents.
- **RESTful API:** Full CRUD for Blogs, Portfolios, Newsletter, and Leads.
- **Form Handling:** Contact form built with mock AJAX submission state UI, connected to Node backend logic.
- **Admin Dashboard:** Secure dashboard template for managing leads, editing portfolio items, and publishing blog posts.
- **SEO Ready:** Dynamic Sitemap API endpoint, XML robots.txt generation, pre-baked meta tags and schema markup structure.

## Author
Developed by the Nexora Engineering Team.
"# website" 
