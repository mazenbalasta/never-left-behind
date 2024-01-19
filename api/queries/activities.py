from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class category(BaseModel):
    id: int
    name: str


class ActivitiesIn(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    category: int


class ActivitiesOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    location: str
    category: int


class ActivityRepo:
    def create_activity(self, activity: ActivitiesIn) -> ActivitiesOut:
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
                            location,
                            category
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id, name, description, start_date, end_date, location, category;
                    """,
                    [
                        activity.name,
                        activity.description,
                        activity.start_date,
                        activity.end_date,
                        activity.location,
                        activity.category
                    ]
                )
                id = result.fetchone()[0]
                old_data = activity.dict()
                return ActivitiesOut(id=id, **old_data)

    def list_activities(self) -> Union[Error, List[ActivitiesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM activities
                        ORDER BY start_date;
                        """
                    )
                    result = []
                    for record in db:
                        activity = ActivitiesOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            start_date=record[3],
                            end_date=record[4],
                            location=record[5],
                            category=record[6]
                        )
                        result.append(activity)
                    return result
        except Exception:
            return {"message": "Could not get all activities"}

    # def delete_activity(self, activity: id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     DELETE FROM activities WHERE id = %s
    #                     """,
    #                     id
    #                 )
    #     except Exception:
    #         pass
