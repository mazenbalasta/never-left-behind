from pydantic import BaseModel
from queries.pool import Queries


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


class AccountQueries(Queries):
    # region properties

    def get(self, email: str) -> AccountOut:
        pass

    def create(self, info: AccountIn, hased_password: str) -> AccountOut:
        pass
