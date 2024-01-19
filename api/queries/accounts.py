from pydantic import BaseModel
from queries.pool import Queries


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str

class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountQueries(Queries):
    def get(self, email:str) -> AccountOut:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        pass
