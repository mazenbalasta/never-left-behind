from pydantic import BaseModel
from typing import Optional
from datetime import date

class states(BaseModel):
    abbreviation: str

class cities(BaseModel):
    name: str

class EventsIn(BaseModel):
    event_title: str
    start_date: date
    end_date: date
    description: Optional[str] = None
    state: states
    city: cities

class EventsOut(BaseModel):
    event_title: str
    start_date: date
    end_date: date
    description: Optional[str] = None
    state: states
    city: cities
    id: int
