from pydantic import BaseModel, validator
from typing import Optional, List, Union
from datetime import datetime
from fastapi import HTTPException
import logging
from queries.pool import pool

logger = logging.getLogger(__name__)


class Error(BaseModel):
    message: str

class Account(BaseModel):
    account: int


    @validator("account")
    def account_must_be_int(cls, valid):
        if not isinstance(valid, int):
            raise ValueError("Account must be an integer")
        return valid


class MessagesIn(Account):
    title: str
    body: str
    date: datetime


class MessagesOut(Account):
    id: int
    title: str
    body: str
    account: int
    date: datetime
    views: Optional[int] = 0
    response_count: Optional[int] = 0

class ResponsesIn(Account):
    body: str


class ResponsesOut(Account):
    id: int
    message_id: int
    body: str
    date: datetime


class MessagesRepo:
    def message_from_db_record(self, record) -> MessagesOut:
        return MessagesOut(
            id=record[0],
            title=record[1],
            body=record[2],
            account=record[3],
            date=record[4],
            views=record[5],
            response_count=record[6],
        )
    

    def create(self, message: MessagesIn) -> MessagesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO messages ( title, body, account, date)
                        VALUES (%s, %s, %s, %s) RETURNING id, title, body, account, date;
                        """,
                        [message.title, message.body, message.account, message.date]
                    )
                    result = db.fetchone()
                    if result and len(result) == 5:
                        return self.message_from_db_record(result + (0, 0))
                    else:
                        logger.error(f'Unexepected result format from create_message: {result}')
                        raise HTTPException(status_code=500, detail="Error in creating message")
        except Exception as e:
            logger.error(f"Error in create message: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")

    def list_messages(self) -> Union[Error, List[MessagesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, COALESCE(m.views, 0),
                        (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m ORDER BY m.date DESC;
                        """
                    )
                    records = db.fetchall()
                    return [self.message_from_db_record(record) for record in records]
        except Exception as e:
            logger.error(f"Error in list messages: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")

    def update_message(self, message_id: int, message: MessagesIn) -> Union[MessagesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET title = %s, body = %s, account = %s, date = %s
                        WHERE id = %s
                        RETURNING id, title, body, account, date, COALESCE(views, 0),
                        (SELECT COUNT(*) FROM responses WHERE message_id = %s) AS response_count;
                        """,
                        [message.title, message.body, message.account, message.date, message_id, message_id]
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(status_code=404, detail="Message not found")
                    return self.message_from_db_record(result)
        except Exception as e:
            logger.error(f'Error in update_message: {e}')
            raise HTTPException(status_code=500, detail="Internal server error")

    def delete_message(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "DELETE FROM messages WHERE id = %s", [message_id]
                    )
                    if db.rowcount == 0:
                        raise HTTPException(status_code=404, detail="Message not found")
                    return True
        except Exception as e:
            logger.error(f'Error in delete_message: {e}')
            raise HTTPException(status_code=500, detail="Internal server error")
        
    def get_message_with_responses(self, message_id: int) -> Union[Error, MessagesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, COALESCE(m.views, 0),
                        (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m WHERE m.id = %s;
                        """,
                        [message_id]
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(status_code=404, detail="Message not found")
                    return self.message_from_db_record(result)
        except Exception as e:
            logger.error(f'Error in get_message_with_responses: {e}')
            raise HTTPException(status_code=500, detail="Internal server error")
        
    def read_increment_message_views(self, message_id: int) -> Union[Error, MessagesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        WITH updated AS (
                            UPDATE messages
                            SET views = COALESCE(views, 0) + 1
                            WHERE id = %s
                            RETURNING id, title, body, account, date
                        )
                        SELECT updated.*,
                            (SELECT COUNT(*) FROM responses WHERE message_id = updated.id) AS response_count
                        FROM updated;
                        """,
                        [message_id]
                    )
                    result = db.fetchone()
                    print(result)
                    if result is None:
                        raise HTTPException(status_code=404, detail="Message not found")
                    logger.debug(f'query result: {result}')
                    return self.message_from_db_record(result)
        except Exception as e:
            logger.error(f'Error in read_increment_message_views: {e}')
            raise HTTPException(status_code=500, detail="Internal server error")
    
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
    
    def get_message_stats(self, message_id: int) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT COUNT(*) FROM responses WHERE message_id = %s;
                    """
                    [message_id],
                )
                response_count = db.fetchone()[0]

                db.execute(
                    """
                    SELECT views FROM messages WHERE id = %s;
                    """
                    [message_id],
                )
                views_count = db.fetchone()[0]

                return {"response_count": response_count, "views_count": views_count}
