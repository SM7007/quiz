---
description: Deploy the backend to Render
---

# Deploying Backend to Render

This workflow guides you through deploying the FastAPI backend to Render.com.

## Prerequisites

Before starting, ensure you have:
- **GitHub account** (to connect your repository to Render)
- **Render account** (sign up at https://render.com - it's free!)
- **Your code pushed to GitHub** (Render deploys from Git repositories)
- **Neon PostgreSQL database URL** (already configured in your .env file)

---

## Step 1: Push Your Code to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch
git init
git add .
git commit -m "Initial commit - Quiz app with FastAPI backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Important:** Make sure `.env` is in your `.gitignore` file so you don't commit sensitive credentials!

---

## Step 2: Sign Up / Log In to Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended for easier integration)

---

## Step 3: Create a New Web Service

### Option A: Using the Dashboard (Recommended for beginners)

1. **Click "New +"** in the top right corner
2. **Select "Web Service"**
3. **Connect your GitHub repository**:
   - Click "Connect account" if this is your first time
   - Authorize Render to access your repositories
   - Select the repository containing your quiz app

4. **Configure the service**:
   - **Name**: `quiz-app-backend` (or any name you prefer)
   - **Region**: Choose the closest to you (e.g., Oregon, Frankfurt)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or set to `backend` if you want)
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r backend/requirements.txt
     ```
   - **Start Command**: 
     ```bash
     cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
     ```

5. **Select the Free Plan** (or paid if you prefer)

6. **Add Environment Variables**:
   - Click "Advanced" or scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - Add the following:
     - **Key**: `DATABASE_URL`
     - **Value**: `postgresql://neondb_owner:npg_VU0m9ytKpuJb@ep-proud-sun-ailnlxlm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
     - (Copy this from your `backend/.env` file)

7. **Click "Create Web Service"**

### Option B: Using render.yaml (Infrastructure as Code)

If you prefer automated deployment:

1. Make sure `render.yaml` is in your repository root
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Render will automatically detect `render.yaml` and configure everything
6. You'll still need to add the `DATABASE_URL` environment variable manually

---

## Step 4: Monitor the Deployment

1. Render will start building your application
2. You'll see logs in real-time showing:
   - Installing dependencies from `requirements.txt`
   - Starting the uvicorn server
3. **Wait for the deployment to complete** (usually 2-5 minutes)
4. Once done, you'll see "Your service is live 🎉"

---

## Step 5: Get Your Backend URL

1. After deployment, Render will provide a URL like:
   ```
   https://quiz-app-backend-xxxx.onrender.com
   ```
2. **Copy this URL** - you'll need it to update your frontend

3. **Test your backend**:
   - Visit: `https://quiz-app-backend-xxxx.onrender.com/`
   - You should see: `{"message": "Quiz API is running"}`
   - Visit: `https://quiz-app-backend-xxxx.onrender.com/docs`
   - You should see the FastAPI interactive documentation

---

## Step 6: Update Frontend to Use Production Backend

Now you need to update your frontend to use the deployed backend URL:

1. Open `frontend/script.js`
2. Find the line:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000/api';
   ```
3. Change it to:
   ```javascript
   const API_BASE_URL = 'https://quiz-app-backend-xxxx.onrender.com/api';
   ```
   (Replace `xxxx` with your actual Render URL)

4. Save the file

---

## Step 7: Test the Integration

1. Open `frontend/index.html` in your browser
2. Complete the quiz
3. Submit your score
4. Check if it saves successfully
5. View the scoreboard to verify data is being stored

---

## Important Notes

### Free Tier Limitations

Render's free tier has some limitations:
- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds to wake up
- 750 hours/month of runtime (enough for most hobby projects)

### Database Connection

- Your Neon PostgreSQL database is already configured
- Make sure the `DATABASE_URL` environment variable is set correctly in Render
- The database will be accessible from Render's servers

### CORS Configuration

- The backend is now configured to allow all origins in production
- For better security, you can later restrict it to your frontend domain:
  ```python
  origins = ["https://your-frontend-domain.com"]
  ```

---

## Troubleshooting

### Build fails with "No module named 'X'"

**Solution**: Make sure all dependencies are in `backend/requirements.txt`

Current dependencies:
- fastapi
- uvicorn
- sqlalchemy
- psycopg2-binary
- python-dotenv
- pydantic
- email-validator

### "Application failed to start"

**Solution**: Check the logs in Render dashboard
- Look for Python errors
- Verify the start command is correct
- Make sure `DATABASE_URL` is set

### Database connection errors

**Solution**: 
- Verify your Neon database is active at https://console.neon.tech
- Check that the `DATABASE_URL` in Render matches your Neon connection string
- Make sure the connection string includes `?sslmode=require`

### CORS errors from frontend

**Solution**: 
- The backend now allows all origins in production
- If you still see CORS errors, check the browser console for the exact error
- Verify you're using the correct backend URL in `frontend/script.js`

---

## Updating Your Deployment

Whenever you make changes to your backend code:

1. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Updated backend code"
   git push
   ```

2. **Render will automatically redeploy** (if you have auto-deploy enabled)
   - Or manually click "Deploy latest commit" in the Render dashboard

---

## Next Steps

After deploying the backend:

1. ✅ Update frontend to use production backend URL
2. ✅ Test the full application
3. 🚀 Deploy the frontend (Vercel, Netlify, or GitHub Pages)
4. 🔒 (Optional) Restrict CORS to your frontend domain for better security
5. 📊 (Optional) Set up monitoring and logging

---

## Useful Render Commands

### View Logs
- Go to your service in Render dashboard
- Click "Logs" tab
- View real-time logs

### Environment Variables
- Go to "Environment" tab
- Add/edit/delete variables
- Changes require a redeploy

### Manual Deploy
- Go to "Manual Deploy" section
- Click "Deploy latest commit"
- Or choose a specific commit/branch

---

## Cost Optimization

Free tier is sufficient for development and small projects, but if you need more:

- **Starter Plan ($7/month)**: No spin-down, better performance
- **Pro Plan ($25/month)**: More resources, priority support

---

## Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use environment variables** for all sensitive data
3. **Restrict CORS** to specific domains in production
4. **Enable HTTPS** (Render does this automatically)
5. **Monitor logs** for suspicious activity

---

## Quick Reference

| Item | Value |
|------|-------|
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Python Version** | 3.11+ |
| **Environment Variable** | `DATABASE_URL` (from Neon) |
| **Health Check Endpoint** | `/` |
| **API Documentation** | `/docs` |

---

## Support

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **FastAPI Documentation**: https://fastapi.tiangolo.com
- **Neon Documentation**: https://neon.tech/docs
