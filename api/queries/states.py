from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class StatesOut(BaseModel):
    abbreviation: str
    state_name: str


class StatesRepo:
    def list_states(self) -> Union[List[StatesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * from states
                        ORDER BY abbreviation ASC;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        state = StatesOut(
                            abbreviation=record[0], state_name=record[1]
                        )
                        result.append(state)
                    return result
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
