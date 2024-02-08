from queries.pool import pool
from typing import Union
from fastapi import HTTPException
from models import EventsIn, EventsOut, EventsOutWithStateInfo, Error, States


class EventsRepo:
    def create(self, event: EventsIn) -> EventsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (
                                event_title,
                                start_date,
                                end_date,
                                description,
                                street_address,
                                city,
                                state
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            event.event_title,
                            event.start_date,
                            event.end_date,
                            event.description,
                            event.street_address,
                            event.city,
                            event.state,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventsOut(id=id, **old_data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def list_events(self) -> Union[Error, EventsOutWithStateInfo]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM events
                        INNER JOIN states
                        ON events.state = states.abbreviation
                        ORDER BY start_date;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        event = EventsOutWithStateInfo(
                            id=record[0],
                            event_title=record[1],
                            start_date=record[2],
                            end_date=record[3],
                            description=record[4],
                            street_address=record[5],
                            city=record[6],
                            state=States(
                                state_id=record[8],
                                abbreviation=record[9],
                                state_name=record[10],
                            ),
                        )
                        result.append(event)
                    return result
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def update_event(
        self, event_id: int, event: EventsIn
    ) -> Union[EventsOutWithStateInfo, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET
                            event_title = %s
                            , start_date = %s
                            , end_date = %s
                            , description = %s
                            , street_address = %s
                            , state = %s
                            , city = %s
                        WHERE id = %s
                        RETURNING
                            id,
                            event_title,
                            start_date,
                            end_date,
                            description,
                            street_address,
                            city,
                            state;
                        """,
                        [
                            event.event_title,
                            event.start_date,
                            event.end_date,
                            event.description,
                            event.street_address,
                            event.state,
                            event.city,
                            event_id,
                        ],
                    )
                    db.fetchone()[0]
                    old_data = event.dict()
                    return EventsOut(id=event_id, **old_data)
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="Event failed to update, please check if event id exist",
            )

    def delete_event(self, event_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events WHERE id = %s
                        """,
                        [event_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Delete failed"
                        )
                    return True
        except Exception:
            raise HTTPException(status_code=500, detail="Delete failed")

    def create_entries(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    for i in range(20000000000):
                        db.execute(
                            """
                            INSERT INTO events
                                (
                                    event_title,
                                    start_date,
                                    end_date,
                                    description,
                                    street_address,
                                    city,
                                    state
                                )
                            VALUES
                                (%s, %s, %s, %s, %s, %s, %s);
                            """,
                            [
                                f"Event { i+1 }",
                                "2022-01-01",
                                "2022-01-02",
                                "Sample description",
                                "Sample street address",
                                "Sample city",
                                "Sample state",
                            ],
                        )
            return "Entries created successfully"
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
