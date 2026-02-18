---
description: How to run the quiz application locally
---

# Running the Quiz Application Locally

This workflow guides you through running the full-stack quiz application on your local machine.

## Prerequisites

Before starting, ensure you have:
- **Python 3.11 or later** installed and added to PATH
- **Internet connection** for database access (Neon PostgreSQL)
- **Modern web browser** (Chrome, Firefox, Edge, etc.)

### Verify Python Installation

```bash
python --version
```

If Python is not installed:
1. Download from https://www.python.org/downloads/
2. During installation, check "Add Python to PATH"
3. Restart your terminal

---

## Step 1: Install Backend Dependencies

Navigate to the backend directory and install required Python packages:

```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch\backend
pip install -r requirements.txt
```

**Expected packages:**
- FastAPI
- uvicorn
- psycopg2-binary
- python-dotenv

---

## Step 2: Verify Database Configuration

Check that the `.env` file exists in the backend directory:

```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch\backend
type .env
```

You should see a `DATABASE_URL` variable pointing to your Neon PostgreSQL database.

**Note:** The database connection is already configured. The backend will automatically create the `users` table on first run.

---

## Step 3: Start the Backend Server

// turbo
Run the FastAPI backend server:

```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch\backend
uvicorn main:app --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Backend API will be available at:** http://localhost:8000

**API Documentation:** http://localhost:8000/docs

**Keep this terminal window open** - the backend must remain running.

---

## Step 4: Start the Frontend

Open a **new terminal window** and start the frontend server:

// turbo
```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch\frontend
python -m http.server 5173
```

**Expected output:**
```
Serving HTTP on :: port 5173 (http://[::]:5173/) ...
```

**Frontend will be available at:** http://localhost:5173

**Alternative:** You can also double-click `frontend/index.html` to open it directly in your browser, but using the HTTP server is recommended to avoid CORS issues.

---

## Step 5: Access the Application

1. Open your web browser
2. Navigate to: **http://localhost:5173**
3. You should see the quiz application login screen

---

## Testing the Application

### Test the Login Flow:
1. Enter your name and email
2. Click "Start Quiz"

### Test the Quiz:
1. Answer the 10 Python questions
2. Click "Submit Quiz" when done
3. View your score and results

### Test the Scoreboard:
1. Click "View Scoreboard" to see all scores
2. Scores are sorted by highest score first

---

## API Endpoints

The backend provides the following endpoints:

### POST `/submit-score`
Submit a quiz score:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "score": 8
}
```

### GET `/scoreboard`
Retrieve all scores sorted by score (descending)

### GET `/users/{email}`
Get user data by email

**Test the API directly:** Visit http://localhost:8000/docs for interactive API documentation

---

## Stopping the Application

### Stop the Backend:
1. Go to the terminal running the backend
2. Press `CTRL+C`

### Stop the Frontend:
1. Go to the terminal running the frontend
2. Press `CTRL+C`

---

## Troubleshooting

### Backend won't start:
- **Error: "python not found"** → Install Python and add to PATH
- **Error: "No module named 'fastapi'"** → Run `pip install -r requirements.txt`
- **Error: "Port 8000 already in use"** → Stop other services on port 8000 or change the port

### Frontend issues:
- **CORS errors** → Use `python -m http.server 5173` instead of opening HTML directly
- **Can't connect to backend** → Ensure backend is running on http://localhost:8000

### Database issues:
- **Connection errors** → Check your internet connection
- **Invalid credentials** → Verify `.env` file has correct DATABASE_URL
- **Check database status** → Visit https://console.neon.tech

### General tips:
- Always start the **backend first**, then the frontend
- Keep both terminal windows open while using the app
- Check browser console (F12) for JavaScript errors
- Check backend terminal for API errors

---

## Quick Reference

| Component | URL | Command to Start |
|-----------|-----|------------------|
| Backend API | http://localhost:8000 | `cd backend && uvicorn main:app --reload` |
| API Docs | http://localhost:8000/docs | (same as backend) |
| Frontend | http://localhost:5173 | `cd frontend && python -m http.server 5173` |
| Database | Neon Cloud | (already configured) |

---

## Next Steps

Once the application is running locally:
- Test all features thoroughly
- Review the code in `backend/` and `frontend/`
- Customize quiz questions in `frontend/script.js`
- Add more features or modify styling
- Consider deployment options (Vercel, Render, Railway, etc.)
