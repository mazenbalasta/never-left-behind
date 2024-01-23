from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
from datetime import datetime
from fastapi import HTTPException


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

    def list_messages(self) -> Union[Error, List[MessagesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM Messages
                        ORDER BY date DESC;
                        """
                    )
                    records = (
                        db.fetchall()
                    )  # If there is a validation error, and all types are checked in table and class.
                    print(
                        records
                    )  # Print the data and check the order of the data in records,
                    result = []  # compared to db.fetchall()
                    for record in records:
                        message = MessagesOut(
                            id=record[0],
                            title=record[1],
                            body=record[2],
                            date=record[3],
                            account=record[4],
                        )
                        result.append(message)
                    return result
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def delete_message(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception as e:
            return False
