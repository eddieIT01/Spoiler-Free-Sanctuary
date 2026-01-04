# Quick Start Guide

Get Spoiler-Free Sanctuary running in 5 minutes!

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org))
- MySQL Server ([Download](https://www.mysql.com/downloads/mysql/))
- Git

## Quick Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install & Run Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your MySQL credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password

# Install dependencies
npm install

# Run migrations (create database and tables)
mysql -u root -p < migrations/schema.sql
# (Or paste contents of schema.sql in MySQL GUI)

# Start backend server
npm run dev
```

Backend should be running at `http://localhost:4000`

### 3. Install & Run Frontend

Open a new terminal:

```bash
# From the root directory (frontend folder)
npm install

# Start frontend dev server
npm run dev
```

Frontend should be running at `http://localhost:5173`

## Testing

### Test API Endpoints

```bash
cd backend
npm test
```

This runs comprehensive tests for:
- User signup/login
- CRUD operations
- Error handling
- Authorization

### Manual Testing

1. **Open frontend:** http://localhost:5173
2. **Sign up** with an email and password
3. **Create an order** - click Orders menu
4. **Create an answer** - click the answer form
5. **View admin panel** (if user ID = 1): http://localhost:5173/admin

## Key URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| API Docs | http://localhost:4000 (root endpoint) |
| Database | localhost:3306 |

## Useful Commands

```bash
# Frontend
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build

# Backend
npm run dev        # Start with auto-reload
npm start          # Start production server
npm test           # Run test suite
```

## Troubleshooting

### "Can't connect to database"
- Ensure MySQL is running
- Check credentials in `.env`
- Verify database exists: `spoiler_free_sanctuary`

### "Port 4000 already in use"
- Change PORT in `.env`
- Or kill existing process

### "CORS error on frontend"
- Ensure backend URL is `http://localhost:4000/api` in frontend code
- Check backend is running

### "npm modules not found"
```bash
npm ci  # Clean install
npm install
```

## Default Login

After setup, create a new account. The first user (ID=1) automatically has admin access.

Visit http://localhost:5173/admin to see the admin panel.

## Next Steps

1. ✅ Local development working
2. 📖 Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
3. 📚 See [backend/README-backend.md](./backend/README-backend.md) for API documentation
4. 🔧 Customize guides in `src/data/guides.js`

## Project Structure

```
frontend/
├── src/               # React components and pages
├── backend/           # Node.js + Express API
├── README.md          # Full project documentation
├── DEPLOYMENT.md      # Deployment guide
└── package.json       # Frontend dependencies
```

## Support

For issues:
1. Check browser console (F12) for frontend errors
2. Check terminal logs for backend errors
3. Review API response in Network tab
4. See README.md for more details

---

**Happy coding! 🎮**
