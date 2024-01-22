from pydantic import BaseModel
from queries.pool import pool


# from queries.pool import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: int
    email: str
    full_name: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountOutWithPassword(BaseModel):
    id: int
    email: str
    full_name: str
    hashed_password: str


class AccountQueries:
    def get(self, email: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                data = db.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email]
                )
                account = data.fetchone()
                if data is None:
                    return account
                print('data:', account)
                return AccountOutWithPassword(**account)

    def create(
        self, info: AccountIn, hashed_password: str):

        if self.get(email=info.email) is not None:
            raise DuplicateAccountError
        account = info.dict()
        account['hashed_password'] = hashed_password
        print(account)
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Accounts
                        (
                            email,
                            password,
                            full_name
                        )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, email, password, full_name;
                    """,
                    [info.email, info.password, info.full_name],
                )
                return account
