from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool
from typing import Optional, List, Union
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class states(BaseModel):
    abbreviation: str


class cities(BaseModel):
    name: str


class EventsIn(BaseModel):
    event_title: str
    start_date: datetime
    end_date: datetime
    description: Optional[str] = None
    state: states
    city: str


class EventsOut(BaseModel):
    id: int
    event_title: str
    start_date: datetime
    end_date: datetime
    description: Optional[str] = None
    state: states
    city: str


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
                            city,
                            state
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
                        event.city,
                        event.state.abbreviation,
                    ],
                )
                id = result.fetchone()[0]
                old_data = event.dict()
                return EventsOut(id=id, **old_data)

    def list_events(self) -> Union[Error, List[EventsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM Events
                        ORDER BY start_date DESC;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        event = EventsOut(
                            id=record[0],
                            event_title=record[1],
                            start_date=record[2],
                            end_date=record[3],
                            description=record[4],
                            state=states(abbreviation=record[5]),
                            city=record[6],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
