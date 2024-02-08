from fastapi import APIRouter
from queries.acls import get_local_bars

router = APIRouter()


@router.get("/get_local_bars/{postal}")
async def bars(postal: str):
    bars = get_local_bars(postal)
    return bars
