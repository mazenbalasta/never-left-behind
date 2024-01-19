from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool


class category(BaseModel):
    id: int
    name: str


class ActivitiesIn(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    # category: category


class ActivitiesOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    # category: category


class ActivityRepo:
    def create(self, activity: ActivitiesIn) -> ActivitiesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Activities
                        (
                            name,
                            description,
                            start_date,
                            end_date,
                            location
                        )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        activity.name,
                        activity.description,
                        activity.start_date,
                        activity.end_date,
                        activity.location
                    ]
                )
                id = result.fetchone()[0]
                old_data = activity.dict()
                return ActivitiesOut(id=id, **old_data)
