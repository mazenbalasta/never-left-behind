from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.veterans_accounts import AccountQueries
from authenticator import authenticator
from typing import List
from models import (
    VetAccountIn,
    AccountOut,
    DuplicateAccountError,
    AccountForm,
    AccountToken,
    HttpError,
)


router = APIRouter()


@router.get("/protected", response_model=bool)
async def protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


# @router.get("/token", response_model=AccountToken | None)
# async def get_token(
#     request: Request,
#     account: AccountOut = Depends(authenticator.try_get_current_account_data),
# ) -> AccountToken | None:
#     if account and authenticator.cookie_name in request.cookies:
#         return {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "account": account,
#         }


@router.post("/api/accounts/veterans", response_model=AccountToken | HttpError)
async def create_account(
    info: VetAccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info=info, hashed_password=hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=List[AccountOut])
def list_accounts(
    accounts: AccountQueries = Depends(),
):
    return accounts.list_accounts()
