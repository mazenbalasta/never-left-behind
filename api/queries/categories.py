from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    name: str


class CategoryOut(BaseModel):
    id: int
    name: str


class CategoryRepo:
    def list_categories(self) -> Union[Error, List[CategoryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM categories;
                        """
                    )
                    result = []
                    for record in db:
                        category = CategoryOut(
                            id=record[0],
                            name=record[1]
                        )
                        result.append(category)
                    return result
        except Exception:
            return {"message": "Could not get all categories"}
