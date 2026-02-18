from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, crud, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS Configuration
import os

# Allow all origins in production, specific origins in development
if os.getenv("RENDER"):
    # Production: Allow all origins (you can restrict this later to your frontend domain)
    origins = ["*"]
else:
    # Development: Allow all origins for local network testing
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/submit-score", response_model=schemas.UserResponse)
def submit_score(user: schemas.UserScore, db: Session = Depends(database.get_db)):
    return crud.create_or_update_user_score(db=db, user=user)

@app.get("/api/scoreboard", response_model=List[schemas.UserResponse])
def get_scoreboard(db: Session = Depends(database.get_db)):
    return crud.get_scoreboard(db=db)

@app.get("/")
def read_root():
    return {"message": "Quiz API is running"}
