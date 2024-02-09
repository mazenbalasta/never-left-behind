from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from fastapi import HTTPException
import logging
from queries.pool import pool


class Error(BaseModel):
    message: str


class BaseAccount(BaseModel):
    account: int


class MessageViewIn(BaseModel):
    views: int


class MessageViewOut(BaseModel):
    id: int
    date: datetime
    account: int
    views: int


class MessagesIn(BaseAccount):
    title: str
    body: str
    date: datetime
    account: int


class MessagesOut(BaseAccount):
    id: int
    title: str
    body: str
    account: int
    date: datetime
    views: int
    response_count: int


class ResponsesIn(BaseAccount):
    body: str


class ResponsesOut(BaseAccount):
    id: int
    message_id: int
    body: str
    date: datetime


class MessageWithResponsesOut(MessagesOut):
    responses: List[ResponsesOut]


logger = logging.getLogger(__name__)


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
                        INSERT INTO messages
                            (
                                title,
                                body,
                                account,
                                date
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id, title, body, account, date, views;
                        """,
                        [
                            message.title,
                            message.body,
                            message.account,
                            message.date,
                        ],
                    )
                    result = db.fetchone()
                    print(result)
                    if result:
                        response_count = 0
                        return self.message_from_db_record(
                            result + (response_count,)
                        )
                    else:
                        raise HTTPException(
                            status_code=500, detail="error in create message"
                        )
        except Exception as e:
            logger.error(f"Error in create: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def list_messages(self) -> Union[Error, List[MessagesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, m.views,
                        (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m ORDER BY m.date DESC;
                        """
                    )
                    records = db.fetchall()
                    return [
                        self.message_from_db_record(record)
                        for record in records
                    ]
        except Exception as e:
            logger.error(f"Error in list messages: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def get_message(self, message_id: int) -> Union[MessagesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, m.views,
                        (SELECT COUNT(*) FROM responses WHERE message_id = m.id) AS response_count
                        FROM messages m WHERE m.id = %s;
                        """,
                        [message_id],
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return self.message_from_db_record(result)
        except Exception as e:
            logger.error(f"Error in get_message: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def update_message(
        self, message_id: int, message: MessagesIn
    ) -> Union[MessagesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET title = %s, body = %s, account = %s, date = %s
                        WHERE id = %s
                        RETURNING id, title, body, account, date, views,
                        (SELECT COUNT(*) FROM responses WHERE message_id = %s) AS response_count;
                        """,
                        [
                            message.title,
                            message.body,
                            message.account,
                            message.date,
                            message_id,
                            message_id,
                        ],
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return self.message_from_db_record(result)
        except Exception as e:
            logger.error(f"Error in update_message: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def delete_message(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "DELETE FROM messages WHERE id = %s", [message_id]
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return True
        except Exception as e:
            logger.error(f"Error in delete_message: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def get_message_with_responses(
        self, message_id: int
    ) -> Union[Error, MessageWithResponsesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT m.id, m.title, m.body, m.account, m.date, m.views
                        FROM messages m
                        WHERE m.id = %s;
                        """,
                        [message_id],
                    )
                    message_result = db.fetchone()
                    if message_result is None:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )

                    db.execute(
                        """
                        SELECT r.id, r.message_id, r.body, r.account, r.date
                        FROM responses r
                        WHERE r.message_id = %s;
                        """,
                        [message_id],
                    )
                    response_results = db.fetchall()

                    responses = [
                        ResponsesOut(
                            id=response[0],
                            message_id=response[1],
                            body=response[2],
                            account=response[3],
                            date=response[4],
                        )
                        for response in response_results
                    ]

                    return MessageWithResponsesOut(
                        id=message_result[0],
                        title=message_result[1],
                        body=message_result[2],
                        account=message_result[3],
                        date=message_result[4],
                        views=message_result[5],
                        response_count=len(responses),
                        responses=responses,
                    )
        except Exception as e:
            logger.error(f"Error in get_message_with_responses: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def read_increment_message_views(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET views = COALESCE(views, 0) + 1
                            WHERE id = %s
                            RETURNING id;
                            """,
                        [message_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )
                    return True
        except Exception as e:
            logger.error(f"Error in read_increment_message_views: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def create_response(
        self, message_id: int, response: ResponsesIn
    ) -> ResponsesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT id FROM messages WHERE id = %s", [message_id]
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Message not found"
                        )

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
        except Exception as e:
            logger.error(f"Error in create_response: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error"
            )

    def get_message_stats(self, message_id: int) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT COUNT(*) FROM responses WHERE message_id = %s;
                    """,
                    [message_id],
                )
                response_count = db.fetchone()[0]

                db.execute(
                    """
                    SELECT views FROM messages WHERE id = %s;
                    """,
                    [message_id],
                )
                views_count = db.fetchone()[0]

                return {
                    "response_count": response_count,
                    "views_count": views_count,
                }
