from fastapi import APIRouter, Depends
from typing import List
from queries.messages import MessagesIn, MessagesOut, MessagesRepo

router = APIRouter()


@router.post("/api/messages", response_model=MessagesOut)
def create_message(message: MessagesIn, repo: MessagesRepo = Depends()):
    return repo.create(message)
