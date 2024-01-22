from fastapi import APIRouter, Depends
from queries.messages import MessagesIn, MessagesOut, MessageRepo
from typing import List

router = APIRouter()


@router.post("/api/messages", response_model=MessagesOut)
def create_message(message: MessagesIn, repo: MessageRepo = Depends()):
    pass
