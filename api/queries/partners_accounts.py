from queries.pool import pool
from typing import Optional
from models import PartnerAccountIn, AccountOutWithPassword
from fastapi import HTTPException


class DuplicateAccountError(ValueError):
    pass


class PartnerAccountQueries:
    def create(
        self, info: PartnerAccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            try:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO Accounts
                            (
                                account_type
                                , username
                                , password
                                , email
                                , first_name
                                , last_name
                                , company_name
                                , city
                                , state
                                , country
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            info.account_type,
                            info.username,
                            hashed_password,
                            info.email,
                            info.first_name,
                            info.last_name,
                            info.company_name,
                            info.city,
                            info.state,
                            info.country,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = info.dict()
                    return AccountOutWithPassword(
                        id=id, hashed_password=hashed_password, **old_data
                    )
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="Username or email already in use, please use a different one",
                )

    async def get(self, username: str) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                record = db.fetchone()
                if record:
                    return AccountOutWithPassword(
                        id=record[0],
                        account_type=record[1],
                        username=record[2],
                        hashed_password=record[3],
                        email=record[4],
                        first_name=record[5],
                        last_name=record[6],
                    )
                return None
