# Bloggify

A modern, full-featured blog publishing platform built with React and Vite. Bloggify allows users to create, publish, and manage blog posts with a rich text editor, complete with user authentication and admin moderation capabilities.

## Features

- **User Authentication**
  - User registration and login
  - Forgot password with email verification
  - Password reset via secure token links
  - Token-based authentication with protected routes

- **Blog Management**
  - Create blogs with rich text editor (React Quill)
  - Upload images for blog posts
  - View all published blogs in a responsive grid layout

- **Admin Panel**
  - Review unapproved blog submissions
  - Approve or reject blog posts
  - Role-based access control

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Rich Text Editor | React Quill New |
| Notifications | React Toastify |

## Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx          # Navigation with auth-based menu
│   ├── Footer.jsx          # Footer with links and social icons
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── Pages/
│   ├── Blog.jsx            # Home page with blog list
│   ├── Register.jsx        # User registration
│   ├── Login.jsx           # User login
│   ├── CreateBlog.jsx      # Blog creation with rich editor
│   ├── ForgotPassword.jsx  # Password recovery
│   ├── ResetPassword.jsx   # Password reset form
│   ├── AdminPanel.jsx      # Admin moderation dashboard
│   └── PageNotFound.jsx    # 404 error page
├── Services/
│   └── api.js              # Axios instance with auth interceptor
├── App.jsx                 # Main app with routes
├── main.jsx                # React entry point
└── index.css               # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bloggify-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## API Configuration

The application connects to a backend API hosted at:
```
https://bloggify-backend-oynh.onrender.com/api
```

Authentication tokens are automatically attached to requests via Axios interceptors.

## Environment

This is the frontend application for Bloggify. It requires the Bloggify backend API to be running for full functionality.

## License

This project is private and not licensed for public distribution.
