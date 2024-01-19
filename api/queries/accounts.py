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
        pass

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
                            full_name

                        )
                    VALUES
                        (%s, %s, %s)
                    RETURNING email, password, full_name;
                    """,
                    [info.email, hashed_password, info.full_name],
                )
                id = result.fetchone()[0]
                print(
                    id,
                    "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
                )
                old_data = info.dict()
                return AccountOutWithPassword(
                    id=id, hashed_password=hashed_password, **old_data
                )
