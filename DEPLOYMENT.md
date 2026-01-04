# Deployment Guide - Spoiler-Free Sanctuary

This guide covers deploying both the frontend and backend to production.

## Quick Overview

- **Frontend:** React app → Netlify
- **Backend:** Node.js API → Railway or Render
- **Database:** MySQL → Railway, Render, or AWS RDS

## Prerequisites

1. GitHub account with project pushed
2. Netlify account (free tier works)
3. Railway or Render account (free tier works)
4. MySQL database (can be hosted by Railway/Render)

---

## Backend Deployment

### Option 1: Railway (Recommended)

Railway is the simplest option for Node.js + MySQL.

#### Step 1: Set up Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your repository
5. Wait for auto-detection (should detect Node.js)

#### Step 2: Add MySQL Database

1. In Railway dashboard, click "Add Service"
2. Select "MySQL"
3. Click "Create"
4. Wait for database to provision

#### Step 3: Configure Environment Variables

1. In Railway, go to your Node.js service
2. Click "Variables"
3. Add the following variables:

```
NODE_ENV=production
PORT=4000
DB_HOST=<Copy from MySQL service database URL>
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<Copy from MySQL service>
DB_NAME=spoiler_free_sanctuary
JWT_SECRET=<Generate a strong random string>
ADMIN_USER_ID=1
CORS_ORIGIN=<Your Netlify frontend URL>
```

To get MySQL credentials in Railway:
1. Click MySQL service in Railway
2. Go to "Connect" tab
3. Copy the connection details

#### Step 4: Run Database Migrations

1. Click your Node.js service
2. Go to "Deployments"
3. After successful deploy, click the active deployment
4. In the logs, you should see the app is running

To run migrations manually:
1. Connect to MySQL using the provided credentials
2. Run the SQL commands from `backend/migrations/schema.sql`

#### Step 5: Get Your Backend URL

In Railway dashboard, click your Node.js service and find the deployment URL.

**Example:** `https://backend-production.railway.app`

---

### Option 2: Render

Render also supports Node.js + PostgreSQL/MySQL.

#### Step 1: Create Web Service

1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name:** spoiler-free-sanctuary-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid)

#### Step 2: Add MySQL Database

1. Click "New +"
2. Select "MySQL"
3. Configure database name and plan
4. Click "Create Database"

#### Step 3: Link Database to Web Service

1. Copy MySQL connection details
2. In Web Service, go to "Environment"
3. Add variables:

```
NODE_ENV=production
PORT=4000
DB_HOST=<MySQL host>
DB_PORT=3306
DB_USER=<MySQL user>
DB_PASSWORD=<MySQL password>
DB_NAME=spoiler_free_sanctuary
JWT_SECRET=<Strong random string>
ADMIN_USER_ID=1
CORS_ORIGIN=<Netlify URL>
```

#### Step 4: Deploy

Render auto-deploys from GitHub. Your service will be available at:
`https://<service-name>.onrender.com`

---

## Frontend Deployment

### Netlify (Recommended)

#### Step 1: Connect GitHub

1. Go to https://netlify.com
2. Click "Add new site"
3. Select "Import an existing project"
4. Choose GitHub and select your repository

#### Step 2: Configure Build Settings

Netlify usually auto-detects settings. Verify:

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18 (or latest)

#### Step 3: Add Environment Variables

1. In Netlify, go to "Site Settings"
2. Click "Build & Deploy"
3. Click "Environment"
4. Add variable:

```
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

Replace with your actual backend URL from Railway/Render.

#### Step 4: Deploy

Netlify auto-deploys on push to main branch.

**Your site URL:** `https://your-site-name.netlify.app`

---

## Post-Deployment Checklist

- [ ] Test signup and login on frontend
- [ ] Create an order through the UI
- [ ] Verify data appears in backend database
- [ ] Test admin panel at `/admin`
- [ ] Check error handling (try invalid login)
- [ ] Test on mobile (responsive design)
- [ ] Check CORS errors in browser console
- [ ] Verify environment variables are set correctly
- [ ] Test database backups

---

## Database Migrations

After deploying backend, run migrations:

### Method 1: Using MySQL CLI

```bash
mysql -h <DB_HOST> -u <DB_USER> -p<DB_PASSWORD> < backend/migrations/schema.sql
```

### Method 2: Using MySQL GUI

1. Open MySQL Workbench or similar
2. Connect to your database
3. Copy-paste contents of `backend/migrations/schema.sql`
4. Execute

### Method 3: Automated Script

Add to `backend/src/index.js` (after line 20):

```javascript
// Auto-run migrations
if (process.env.RUN_MIGRATIONS === 'true') {
  const fs = require('fs')
  const schema = fs.readFileSync('./migrations/schema.sql', 'utf-8')
  pool.query(schema).then(() => {
    console.log('Migrations completed')
  }).catch(err => {
    console.error('Migration failed:', err)
  })
}
```

Then set `RUN_MIGRATIONS=true` in environment variables on first deploy.

---

## Custom Domain (Optional)

### Netlify Custom Domain

1. In Netlify, go to "Site Settings"
2. Click "Domain Management"
3. Click "Add Custom Domain"
4. Enter your domain
5. Follow DNS setup instructions

### Backend Custom Domain

Similar process on Railway/Render.

---

## Monitoring & Logging

### Railway

- Logs auto-appear in deployment dashboard
- Errors and console.log() output visible

### Render

- Logs available in "Logs" section
- Can tail logs from CLI

### Netlify

- Build logs in "Deploys"
- Frontend errors visible in browser console

---

## Troubleshooting

### Backend Won't Start

- Check logs for errors
- Verify all environment variables set
- Ensure database credentials are correct
- Check Node version compatibility

### CORS Errors

- Update `CORS_ORIGIN` to match frontend URL
- Ensure backend is redeployed after change

### Database Connection Failed

- Verify connection string in logs
- Check database is running
- Confirm credentials
- Try connecting manually with MySQL client

### Frontend Can't Reach Backend

- Check `VITE_API_BASE_URL` in Netlify environment
- Ensure backend URL is correct
- Verify CORS settings
- Check network tab in browser DevTools

### 502 Bad Gateway Errors

- Backend service may be sleeping (free tier)
- Check Railway/Render logs
- Restart the service
- Check database connection

---

## Performance Optimization

### Frontend

- Assets already cached via Netlify headers
- Tree-shaking enabled in production build
- Minification automatic

### Backend

- Connection pooling enabled (mysql2)
- Consider adding caching for frequent queries
- Monitor database query performance
- Use appropriate indexes

---

## Security Best Practices

✅ Before Production Deployment:

1. **Change all secrets:**
   - JWT_SECRET
   - Database passwords
   - API keys

2. **Use HTTPS:** Both services auto-provide

3. **Update dependencies:**
   ```bash
   npm audit fix
   ```

4. **Set environment to production:**
   ```
   NODE_ENV=production
   ```

5. **Enable authentication:**
   - All sensitive endpoints require JWT token
   - Admin routes check ADMIN_USER_ID

6. **Database security:**
   - Use strong passwords
   - Restrict access to private network if possible
   - Regular backups

---

## Deployment Workflow

Standard deployment process:

1. **Develop locally**
   ```bash
   npm run dev          # frontend
   npm run dev          # backend (in backend folder)
   ```

2. **Test thoroughly**
   - Manual testing
   - Check error cases
   - Mobile responsiveness

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feature: description"
   git push origin main
   ```

4. **Monitor deployment**
   - Watch Netlify build logs
   - Watch Railway/Render deployment logs
   - Test deployed application

5. **Verify in production**
   - Visit live URLs
   - Test key features
   - Check error handling

---

## Rollback Procedure

If deployment fails:

### Netlify
1. Go to "Deploys"
2. Find last working deployment
3. Click "Publish deploy"

### Railway
1. Go to "Deployments"
2. Select previous deployment
3. Promote to production

### Render
1. Go to "Logs"
2. Check deployment history
3. Manual redeploy from specific commit

---

## Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Support

For deployment issues:

1. Check service status pages
2. Review logs in deployment dashboard
3. Verify environment variables
4. Test locally first
5. Open issue on GitHub

---

**Last Updated:** January 2026  
**Version:** 1.0.0
