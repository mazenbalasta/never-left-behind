from fastapi import APIRouter, Depends
from queries.states import StatesRepo, StatesOut
from typing import List

router = APIRouter()


@router.get("/api/states", response_model=List[StatesOut])
def list_states(repo: StatesRepo = Depends()):
    return repo.list_states()
