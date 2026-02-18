# Python Quiz Web Application

A full-stack quiz application with a modern frontend (HTML/CSS/JS) and FastAPI backend connected to Neon PostgreSQL database.

## 🚀 Features

- **User Authentication**: Login with name and email
- **Interactive Quiz**: 10 Python programming questions
- **Real-time Scoring**: Instant feedback on answers
- **Global Scoreboard**: View top scores from all users
- **Modern UI**: Glassmorphism design with smooth animations
- **Responsive Design**: Works on desktop and mobile

## 📋 Prerequisites

- Python 3.7+ installed
- Neon PostgreSQL account (free tier available at https://neon.tech)
- A modern web browser

## 🛠️ Setup Instructions

### 1. Database Setup (Neon)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/dbname?sslmode=require`)

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file and add your Neon database URL:
   ```
   DATABASE_URL=postgresql://your-connection-string-here
   ```

3. Install Python dependencies:
   ```bash
   python -m pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload
   ```

   The backend will run at: http://localhost:8000

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser, or use a simple HTTP server:
   ```bash
   python -m http.server 5173
   ```

   The frontend will be available at: http://localhost:5173

## 🎮 How to Use

1. **Login**: Enter your name and email on the login screen
2. **Take Quiz**: Answer 10 Python questions by clicking on options
3. **View Results**: See your score and performance message
4. **Check Scoreboard**: View global rankings of all users
5. **Retake**: Try again to improve your score!

## 🔌 API Endpoints

### POST `/api/submit-score`
Submit a user's quiz score
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "score": 8
}
```

### GET `/api/scoreboard`
Retrieve top scores
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "score": 10
  }
]
```

## 📁 Project Structure

```
.
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database connection
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # Database operations
│   ├── requirements.txt  # Python dependencies
│   └── .env             # Environment variables
│
└── frontend/
    ├── index.html        # Main HTML file
    ├── style.css         # Styling
    └── script.js         # Quiz logic & API calls
```

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect
- **Gradient Accents**: Vibrant purple and pink gradients
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Responsive Layout**: Mobile-friendly design
- **Dark Theme**: Easy on the eyes

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python is installed: `python --version`
- Check if all dependencies are installed
- Verify your DATABASE_URL in `.env` is correct

### Frontend can't connect to backend
- Ensure backend is running on http://localhost:8000
- Check browser console for CORS errors
- Verify API_BASE_URL in `script.js` matches your backend URL

### Database connection fails
- Verify your Neon connection string is correct
- Check if your Neon project is active
- Ensure you have internet connection (Neon is cloud-based)

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
