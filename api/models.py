from enum import Enum
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import datetime
from typing import Optional


class States(BaseModel):
    state_id: int
    abbreviation: str
    state_name: str


class DuplicateAccountError(ValueError):
    pass


class AccountType(str, Enum):
    veteran = "veteran"
    partner = "partner"


class VetAccountIn(BaseModel):
    account_type: AccountType
    username: str
    password: str
    email: str
    first_name: str
    last_name: str


class PartnerAccountIn(BaseModel):
    account_type: AccountType
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    company_name: str
    city: str
    state: str
    country: str


class AccountOut(BaseModel):
    id: int
    account_type: AccountType
    username: str
    email: str
    first_name: str
    last_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


class Error(BaseModel):
    message: str


class EventsIn(BaseModel):
    event_title: str
    start_date: datetime
    end_date: datetime
    description: Optional[str] = None
    street_address: str
    city: str
    state: str


class EventsOut(BaseModel):
    id: int
    event_title: str
    start_date: datetime
    end_date: datetime
    description: Optional[str] = None
    street_address: str
    city: str
    state: str


class EventsOutWithStateInfo(BaseModel):
    id: int
    event_title: str
    start_date: datetime
    end_date: datetime
    description: Optional[str] = None
    street_address: str
    city: str
    state: States
