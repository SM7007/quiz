from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserScore(UserBase):
    score: int

class UserResponse(UserScore):
    id: int

    class Config:
        from_attributes = True
