# 🚨 IMPORTANT: Python Installation Required

## Python is not currently installed or not in your PATH

### Option 1: Install Python (Recommended)

1. **Download Python**:
   - Go to https://www.python.org/downloads/
   - Download Python 3.11 or later for Windows
   - **IMPORTANT**: During installation, check "Add Python to PATH"

2. **Verify Installation**:
   ```bash
   python --version
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Run the Backend**:
   ```bash
   uvicorn main:app --reload
   ```

### Option 2: Use Microsoft Store Python

1. Open Microsoft Store
2. Search for "Python 3.11" or "Python 3.12"
3. Install it
4. Follow steps 2-4 from Option 1

---

## Quick Start (After Python is Installed)

### 1. Start Backend Server
```bash
cd C:\Users\lenovo\.gemini\antigravity\scratch\backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run at: **http://localhost:8000**

### 2. Open Frontend
Simply open this file in your browser:
```
C:\Users\lenovo\.gemini\antigravity\scratch\frontend\index.html
```

Or use Python's built-in server:
```bash
cd C:\Users\lenovo\.gemini\antigravity\scratch\frontend
python -m http.server 5173
```

Frontend will be at: **http://localhost:5173**

---

## ✅ Database is Already Configured!

Your Neon PostgreSQL database connection is already set up in `backend/.env`:
```
DATABASE_URL=postgresql://neondb_owner:npg_VU0m9ytKpuJb@...
```

Once Python is installed, the backend will automatically:
- Connect to your Neon database
- Create the `users` table
- Handle score submissions and scoreboard queries

---

## 🎮 Testing the Frontend (Without Backend)

You can still view the frontend design right now:
1. Navigate to: `C:\Users\lenovo\.gemini\antigravity\scratch\frontend`
2. Double-click `index.html`
3. The quiz will work, but score submission will fail (needs backend)

---

## 📞 Need Help?

If you encounter issues:
1. Make sure Python is installed and in PATH
2. Restart your terminal after installing Python
3. Check that the backend server is running on port 8000
4. Verify your Neon database is active at https://console.neon.tech
