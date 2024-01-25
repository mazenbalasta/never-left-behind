from pydantic import BaseModel
from queries.pool import pool
from typing import Optional, List, Union
from typing import Optional

# from queries.pool import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str
    partner_name: str
    city: str
    state: str
    country: str
    account_type: int


class AccountOut(BaseModel):
    id: int
    email: str
    full_name: str
    partner_name: str
    city: str
    state: str
    country: str
    account_type: int


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def list_accounts(
        self,
    ) -> Union[DuplicateAccountError, List[AccountOutWithPassword]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM accounts;
                        """
                    )
                    result = []
                    for record in db:
                        account = AccountOutWithPassword(
                            id=record[0],
                            email=record[1],
                            hashed_password=record[2],
                            full_name=record[3],
                            partner_name=record[4],
                            city=record[5],
                            state=record[6],
                            country=record[7],
                            account_type=record[8],
                        )
                        result.append(account)
                    return result
        except Exception:
            return {"message": "Could not get all accounts"}

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Accounts
                        (
                            email,
                            password,
                            account_type

                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, email, password, full_name;
                    """,
                    [
                        info.email,
                        hashed_password,
                        info.full_name,
                        info.partner_name if info.partner_name else None,
                        info.city,
                        info.state,
                        info.country,
                        info.account_type,
                    ],
                )
                id = result.fetchone()[0]
                print(
                    info,
                    "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
                )
                old_data = info.dict()
                return AccountOutWithPassword(
                    id=id, hashed_password=hashed_password, **old_data
                )

    async def get(self, email: str) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE email = %s
                    """,
                    [email],
                )
                record = db.fetchone()
                if record:
                    return AccountOutWithPassword(
                        id=record[0],
                        email=record[1],
                        hashed_password=record[2],
                        full_name=record[3],
                    )
                return None
