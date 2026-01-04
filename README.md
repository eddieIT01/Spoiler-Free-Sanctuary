# Spoiler-Free Sanctuary

University project: A full-stack React + Node.js + MySQL application that helps players track game progress and receive spoiler-free tips with user authentication and admin panel.

**Live Demo:** [Your Netlify URL]  
**Backend API:** [Your Railway/Render URL]  
**Repository:** [Your GitHub URL]

## Project Overview

**Purpose:** Provide a secure platform where players can track narrative-driven game progress, receive spoiler-free tips, and create/manage game guides without spoilers.

**Key Features:**
- User authentication (signup/login) with JWT
- Progress-based unlocking of game guides
- Spoiler-safe UI with locked sections
- CRUD operations for orders and answers
- Admin panel for content management
- Responsive dark theme
- MySQL database with proper relationships

## Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL 5.7+** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Project Structure

```
.
├── src/                           # Frontend React app
│   ├── components/
│   │   ├── AnswerForm.jsx
│   │   ├── GuideSection.jsx
│   │   ├── Layout.jsx
│   │   └── ParticleBackground.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Admin.jsx              # Admin panel
│   │   ├── Contact.jsx
│   │   ├── Features.jsx
│   │   ├── GameDetail.jsx
│   │   ├── GameProgressView.jsx
│   │   └── Home.jsx
│   ├── data/
│   │   ├── guides.js
│   │   └── tloU_guide.js
│   ├── utils/
│   │   └── guideStore.js
│   ├── App.jsx
│   ├── router.jsx
│   ├── main.jsx
│   └── index.css
├── backend/                       # Node.js + Express API
│   ├── src/
│   │   ├── index.js               # Main app
│   │   ├── db.js                  # Database config
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT middleware
│   │   └── routes/
│   │       ├── auth.js            # Auth endpoints
│   │       ├── users.js           # User CRUD
│   │       ├── orders.js          # Orders CRUD
│   │       ├── answers.js         # Answers CRUD
│   │       └── admin.js           # Admin endpoints
│   ├── migrations/
│   │   └── schema.sql             # Database schema
│   ├── scripts/
│   │   ├── run_migrations.js
│   │   └── test_api.js
│   ├── .env.example
│   ├── package.json
│   └── README-backend.md
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- MySQL 5.7+ (local or hosted)
- Git

### Frontend Setup (Local Development)

1. Install dependencies:
```bash
npm install
```

2. Configure environment (create `.env.local` if needed):
```
VITE_API_BASE_URL=http://localhost:4000/api
```

3. Start dev server:
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Backend Setup (Local Development)

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create database and tables:
```bash
mysql -u root -p < migrations/schema.sql
```

4. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

Example `.env`:
```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spoiler_free_sanctuary
JWT_SECRET=your_secret_key_here
ADMIN_USER_ID=1
```

5. Start backend server:
```bash
npm run dev
# or for production:
npm start
```

Backend runs on http://localhost:4000

## Frontend Features

### Pages
- **Home** - Landing page with featured games
- **Game Detail** - Detailed game guides with progress tracking
- **Game Progress View** - Interactive chapter/section completion
- **Features** - Feature showcase
- **About** - Project information
- **Contact** - Contact form
- **Admin** - Admin dashboard (for user ID 1)

### Key Components
- **Layout** - Navigation and footer
- **GuideSection** - Displays tips or locked state
- **AnswerForm** - Create answers/tips
- **ParticleBackground** - Animated background

## Backend API Documentation

### Authentication
```bash
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Users
```bash
GET /api/users/profile                    # Current user profile
GET /api/users/:id                        # User by ID
PUT /api/users/:id                        # Update profile
DELETE /api/users/:id                     # Delete account
```

### Orders
```bash
POST /api/orders                          # Create order
GET /api/orders                           # Get all user orders
GET /api/orders/:id                       # Get order by ID
PUT /api/orders/:id                       # Update order
DELETE /api/orders/:id                    # Delete order
```

### Answers
```bash
POST /api/answers                         # Create answer
GET /api/answers                          # Get all user answers
GET /api/answers/:id                      # Get answer by ID
PUT /api/answers/:id                      # Update answer
DELETE /api/answers/:id                   # Delete answer
```

### Admin Endpoints (requires admin token)
```bash
GET /api/admin/dashboard                  # Dashboard stats
GET /api/admin/users                      # All users
GET /api/admin/users/:id                  # User details
DELETE /api/admin/users/:id               # Delete user
GET /api/admin/orders                     # All orders
DELETE /api/admin/orders/:id              # Delete order
GET /api/admin/answers                    # All answers
DELETE /api/admin/answers/:id             # Delete answer
```

See [backend/README-backend.md](backend/README-backend.md) for complete API documentation.

## Database Schema

### users
```sql
id (INT, PK) | name (VARCHAR) | email (VARCHAR, UNIQUE) | password_hash (VARCHAR) | created_at (TIMESTAMP)
```

### orders
```sql
id (INT, PK) | user_id (INT, FK) | title (VARCHAR) | details (TEXT) | created_at (TIMESTAMP)
```

### answers
```sql
id (INT, PK) | user_id (INT, FK) | question (VARCHAR) | answer (TEXT) | created_at (TIMESTAMP)
```

## Deployment

### Frontend - Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Set environment variable: `VITE_API_BASE_URL=<backend_url>`
6. Deploy

### Backend - Railway
1. Push code to GitHub
2. Create new project on Railway
3. Connect GitHub repo
4. Add MySQL database
5. Set environment variables
6. Deploy

**Or Render:**
1. Connect GitHub
2. Create PostgreSQL database
3. Set environment variables
4. Deploy

## Running Tests

### API Testing
```bash
cd backend
node scripts/test_api.js
```

## Build & Preview

### Frontend Production Build
```bash
npm run build
npm run preview
```

### Backend Production
```bash
cd backend
npm start
```

## Development Notes

- Frontend uses Vite for fast HMR
- Backend uses nodemon for auto-reload in dev
- Database migrations in `backend/migrations/schema.sql`
- Environment variables must be set before starting servers

## Troubleshooting

### Frontend
- **CORS errors**: Check `VITE_API_BASE_URL` and backend CORS config
- **Build errors**: Run `npm ci` then `npm run build`
- **Blank page**: Check browser console (F12) for errors

### Backend
- **Database connection**: Verify DB credentials in `.env`
- **Port in use**: Kill process or change PORT in `.env`
- **Token errors**: Ensure JWT_SECRET is set consistently

### Netlify
- Clear cache and redeploy
- Check deployment logs
- Hard refresh browser (Ctrl+Shift+R)

## Screenshots

[Add screenshots of:
- Home page
- Game detail page with progress tracking
- Login/signup flow
- Admin dashboard
- Mobile responsive view]

## Git Commit History

All commits with descriptive messages are available in the repository history. Notable commits:

- Initial project setup with React + Vite
- Backend API implementation
- Database schema and migrations
- Authentication system
- CRUD operations
- Admin panel
- Error handling and validation
- Deployment configuration

## License

MIT

## Author

[Your Name]  
University Project - [Course Name]  
Date: January 2026

## Support

For issues or questions:
1. Check the [backend/README-backend.md](backend/README-backend.md) for API details
2. Open an issue on GitHub
3. Contact the development team

- Progress is saved per game in `localStorage` under the key `sfs_progress_v1`.

If you prefer not to use localStorage, open `src/pages/GameProgressView.jsx` and remove the storage calls.

## UI and Visuals

- The static pages (`Home`, `About`, `Features`, `Contact`) include enhanced visuals, gradients, and subtle animations to provide a polished gaming-oriented look.
- Animations are implemented via Tailwind keyframes in `tailwind.config.cjs`. If you need reduced-motion support, it's easy to add `@media (prefers-reduced-motion: reduce)` fallbacks.

## Runtime editing

- An in-browser editor is available at `/admin` to add or edit guides. Changes are saved to `localStorage` under the key `sfs_guides_v1` and the app will pick them up automatically.
- Guide progress is still stored per-game in `localStorage` under the key `sfs_progress_v1`.

## Deploying to GitHub Pages (automated)

This repository includes a GitHub Actions workflow that builds the app and deploys it to GitHub Pages whenever you push to the `main` (or `master`) branch.

Steps to deploy:

1. Create a GitHub repository (on github.com) for this project.

2. On your machine (project root `c:\Users\DELL\frontend`), run these commands in PowerShell to initialize a repo (if you haven't already), commit, and push:

```powershell
git init
git add .
git commit -m "Initial commit: Spoiler-Free Sanctuary"
# add remote (replace <your-remote-url> with the one GitHub provides)
git remote add origin <your-remote-url>
# push to main (create branch if needed)
git branch -M main
git push -u origin main
```

3. After you push, GitHub Actions will run the `deploy.yml` workflow and publish the site to GitHub Pages. You can check the Actions tab on GitHub for build logs.

Notes:
- We use `HashRouter` so client-side routing works on GitHub Pages without special server configuration.
- The workflow uses the official `actions/upload-pages-artifact` and `actions/deploy-pages` steps — no additional secrets are required.

## Backend (Node.js + MySQL)

This project includes a minimal backend scaffold in the `backend/` folder. It demonstrates:

- Node.js + Express API
- MySQL integration (users and orders entities)
- User authentication (signup/login) using bcrypt + JWT

To run the backend locally, follow the steps in `backend/README-backend.md`.



