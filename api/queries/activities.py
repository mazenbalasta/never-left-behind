from pydantic import BaseModel
from typing import Optional
from datetime import date


class category(BaseModel):
    name: str
    description: Optional[str] = None


class ActivitiesIn(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    category: category


class ActivitiesOut(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    category: category
    id: int
