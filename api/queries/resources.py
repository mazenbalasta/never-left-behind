from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class ResourcesIn(BaseModel):
    url: str


class ResourcesOut(BaseModel):
    url: str
    id: int


class ResourcesRepo:
    def create(self, resource: ResourcesIn) -> ResourcesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO resources
                        (
                            url
                        )
                    VALUES
                        (%s)
                    Returning id;
                    """,
                    [
                        resource.url,
                    ],
                )
                id = db.fetchone()[0]
                print("______ID_____:", id)
                old_data = resource.dict()
                print("----OLD DATA----:", old_data)
                return ResourcesOut(id=id, **old_data)

    def list_resources(self) -> Union[List[ResourcesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * from resources
                        ORDER BY id ASC;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        resource = ResourcesOut(
                            id=record[0],
                            url=record[1],
                        )
                        result.append(resource)
                    return result
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def delete_resource(self, resource_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM resources WHERE id = %s
                        """,
                        [resource_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Resource not found"
                        )
                    return True
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
