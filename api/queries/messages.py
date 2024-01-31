from pydantic import BaseModel, validator
from fastapi import HTTPException
from queries.pool import pool
from typing import Optional, List, Union
from datetime import datetime


class Error(BaseModel):
    message: str


class MessagesIn(BaseModel):
    title: str
    body: str
    account: int
    date: datetime

    @validator("account")
    def account_must_be_int(cls, valid):
        if not isinstance(valid, int):
            raise ValueError("Account must be an integer")
        return valid


class MessagesOut(BaseModel):
    id: int
    title: str
    body: str
    account: int
    date: datetime
    views: Optional[int] = 0
    response_count: Optional[int] = 0

    @validator("account")
    def account_must_be_int(cls, valid):
        if not isinstance(valid, int):
            raise ValueError("Account must be an integer")
        return valid


class ResponsesIn(BaseModel):
    body: str
    account: int


class ResponsesOut(BaseModel):
    id: int
    message_id: int
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
                        SELECT m.id, m.title, m.body, m.account, m.date, COALESCE(m.views, 0),
                            (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m
                        ORDER BY m.date DESC;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        message = MessagesOut(
                            id=record[0],
                            title=record[1],
                            body=record[2],
                            account=record[3],
                            date=record[4],
                            views=record[5],
                            response_count=record[6],
                        )
                        result.append(message)
                        print("____records____:", records)
                    return result
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def update_message(
        self, message_id: int, message: MessagesIn
    ) -> Union[MessagesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET
                            title = %s,
                            body = %s,
                            account = %s,
                            date = %s
                        WHERE id = %s
                        RETURNING id, title, body, account, date;
                        """,
                        [
                            message.title,
                            message.body,
                            message.account,
                            message.date,
                            message_id,
                        ],
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )

                    updated_message = MessagesOut(
                        id=result[0],
                        title=result[1],
                        body=result[2],
                        account=result[3],
                        date=result[4],
                    )
                    return updated_message
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def delete_message(self, message_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages WHERE id = %s
                        """,
                        [message_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return True
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        
    def get_message_with_responses(self, message_id: int) -> Union[Error, MessagesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, COALESCE(m.views, 0),
                            (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m
                        WHERE m.id = %s;
                        """,
                        [message_id],
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    message = MessagesOut(
                        id=result[0],
                        title=result[1],
                        body=result[2],
                        date=result[4],
                        account=result[3],
                        views=result[5],
                        response_count=result[6],
                    )
                    return message
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        
    def read_increment_message_views(self, message_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET views = COALESCE(views, 0) + 1
                        WHERE id = %s
                        """,
                        [message_id],
                    )

                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, COALESCE(m.views, 0),
                            (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m
                        WHERE m.id = %s
                        """,
                        [message_id],
                    )
                    result = db.fetchone()

                    if result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return MessagesOut(
                        id=result[0],
                        title=result[1],
                        body=result[2],
                        date=result[3],
                        account=result[4],
                        views=result[5],
                        response_count=result[6],
                    )
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    def create_response(self, message_id: int, response: ResponsesIn) -> ResponsesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO responses
                        (
                            message_id,
                            body,
                            account,
                            date
                        )
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id, message_id, body, account, date;
                    """,
                    [
                        message_id,
                        response.body,
                        response.account,
                        datetime.now(),
                    ],
                )
                result = db.fetchone()
            return ResponsesOut(
                id=result[0],
                message_id=result[1],
                body=result[2],
                account=result[3],
                date=result[4],
            )
