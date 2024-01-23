from pydantic import BaseModel
from fastapi import HTTPException
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
   
    def update_activity(self, activity_id: int, activity: ActivitiesIn) -> Union[ActivitiesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE activities
                        SET
                            name = %s,
                            description = %s,
                            start_date = %s,
                            end_date = %s,
                            location = %s,
                            category = %s
                        WHERE id = %s
                        RETURNING
                            id,
                            name,
                            description,
                            start_date,
                            end_date,
                            location,
                            category;
                        """,
                        [
                            activity.name,
                            activity.description,
                            activity.start_date,
                            activity.end_date,
                            activity.location,
                            activity.category,
                            activity_id
                        ]
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(status_code=404, detail="Activity not found")
                    
                    updated_activity = ActivitiesOut(
                        id=result[0],
                        name=result[1],
                        description=result[2],
                        start_date=result[3],
                        end_date=result[4],
                        location=result[5],
                        category=result[6]
                    )
                    return updated_activity
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def delete_activity(self, activity_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM activities WHERE id = %s
                        """,
                        [activity_id]
                    )
                    return True
        except Exception as e:
            return False

 
