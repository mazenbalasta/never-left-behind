from pydantic import BaseModel
from queries.pool import Queries
import psycopg2


class DuplicateAccountError(ValueError):
    pass


class AccountsIn(BaseModel):
    username: str
    password: str
    email: str


class AccountsOut(BaseModel):
    id: int
    username: str
    password: str
    email: str


class AccountQueries(Queries):

    def get(self, email: str) -> AccountsOut:
        with self.pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, password, email
                    FROM accounts
                    WHERE email = %s
                    """,
                    [email]
                )
                account = db.fetchone()
                if account is None:
                    raise ValueError("Account not found")
                return AccountsOut(**account)

    def create(self, account: AccountsIn) -> AccountsOut:
        with self.pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    db.execute(
                        """
                        INSERT INTO accounts
                            (username, password, email)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id, username, password, email;
                        """,
                        [
                            account.username,
                            account.password,
                            account.email
                        ]
                    )
                    id, username, password, email = db.fetchone()
                    return AccountsOut(id=id, username=username, password=password, email=email)
                except psycopg2.errors.UniqueViolation:
                    raise DuplicateAccountError("Account with that email already exists")
