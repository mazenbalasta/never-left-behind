from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool

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
    city: str

class EventsOut(BaseModel):
    event_title: str
    start_date: date
    end_date: date
    description: Optional[str] = None
    state: states
    city: str
    id: int

class EventsRepo:
    def create(self, event: EventsIn) -> EventsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Events
                        (
                            event_title,
                            start_date,
                            end_date,
                            description,
                            state,
                            city
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        event.event_title,
                        event.start_date,
                        event.end_date,
                        event.description,
                        event.city
                    ]
                )
                id = result.fetchone()[0]
                old_data = event.dict()
                return EventsOut(id=id, **old_data)
