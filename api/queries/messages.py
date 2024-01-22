from pydantic import BaseModel
from queries.pool import pool
from typing import Optional, List, Union
from queries import accounts
from datetime import datetime
from pydantic import BaseModel
from queries.pool import pool
from datetime import datetime


class Error(BaseModel):
    message: str


class MessagesIn(BaseModel):
    title: str
    body: str
    account: int
    date: datetime


class MessagesOut(BaseModel):
    id: int
    title: str
    body: str
    account: int
    date: datetime


class MessagesRepo:
    def create(self, message: MessagesIn) -> MessagesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO messages
                        (
                            title,
                            body,
                            account,
                            date
                        )
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        message.title,
                        message.body,
                        message.account,
                        message.date,
                    ],
                )
                result = db.fetchone()
            id = result[0]
            old_data = message.dict()
            return MessagesOut(id=id, **old_data)
