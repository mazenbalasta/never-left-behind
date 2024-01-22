from pydantic import BaseModel
from queries.pool import pool
from typing import Optional, List, Union
from queries import accounts
from datetime import datetime


class Error(BaseModel):
    message: str


class MessagesIn(BaseModel):
    title: str
    message: str
    userId: int
    date: datetime


class MessagesOut(BaseModel):
    id: int
    title: str
    message: str
    userId: int
    date: datetime


class MessageRepo:
    def create_message(self, message: MessagesIn) -> MessagesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Messages
                        (
                            title,
                            message,
                            userId
                        )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, title, body, userId;
                    """,
                    [
                        message.title,
                        message.body,
                        message.userId
                    ]
                )
                return MessagesOut(**result[0])
            
    
