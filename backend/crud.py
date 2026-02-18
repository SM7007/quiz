from sqlalchemy.orm import Session
from sqlalchemy import desc
import models, schemas

def create_or_update_user_score(db: Session, user: schemas.UserScore):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        if user.score > db_user.score:
            db_user.score = user.score
            db.commit()
            db.refresh(db_user)
        return db_user
    else:
        new_user = models.User(name=user.name, email=user.email, score=user.score)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

def get_scoreboard(db: Session, limit: int = 10):
    return db.query(models.User).order_by(desc(models.User.score)).limit(limit).all()
