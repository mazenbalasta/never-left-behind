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
            raise HTTPException(status_code=500, detail=str(e))

    def update_event(self, event_id: int, event: EventsIn) -> Union[EventsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET
                            event_title = %s,
                            start_date = %s,
                            end_date = %s,
                            description = %s,
                            state = %s,
                            city = %s
                        WHERE id = %s
                        RETURNING
                            id,
                            event_title,
                            start_date,
                            end_date,
                            description,
                            state,
                            city;
                        """,
                        [
                            event.event_title,
                            event.start_date,
                            event.end_date,
                            event.description,
                            event.state.abbreviation,
                            event.city,
                            event_id,
                        ]
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(status_code=404, detail="Message not found")

                    updated_event = EventsOut(
                        id=result[0],
                        event_title=result[1],
                        start_date=result[2],
                        end_date=result[3],
                        description=result[4],
                        state=states(abbreviation=result[5]),
                        city=result[6],
                    )
                    return updated_event
        except HTTPException as error:
            raise error
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def delete_event(self, event_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events WHERE id = %s
                        """,
                        [event_id]
                    )
                    if db.rowcount == 0:
                        raise HTTPException(status_code=404, detail="Message not found")
                    return True
        except HTTPException as error:
            raise error
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
