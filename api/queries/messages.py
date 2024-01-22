from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from typing import Optional, List, Union
from queries import accounts
from datetime import datetime



class Error(BaseModel):
    body: str


class MessagesIn(BaseModel):
    title: str
    body: str
    userId: int
    date: datetime


class MessagesOut(BaseModel):
    id: int
    title: str
    body: str
    userId: int
    date: datetime


class MessageRepo:
    def create(self, message: MessagesIn) -> MessagesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO messages 
                        (
                            title, 
                            body, 
                            userId, 
                            date
                        )
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id, title, body, userId, date;
                    """,
                    [
                        message.title,
                        message.body,
                        message.userId,
                        message.date
                    ],
                )
                id = result.fetchone()[0]
                old_data = message.dict()
                if result is None:
                    raise HTTPException(status_code=404, detail="Message not found")
                return MessagesOut(**result)
