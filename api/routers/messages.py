from fastapi import APIRouter, Depends
from typing import List
from queries.messages import MessagesIn, MessagesOut, MessagesRepo

router = APIRouter()


@router.post("/api/messages", response_model=MessagesOut)
def create_message(message: MessagesIn, repo: MessagesRepo = Depends()):
    return repo.create(message)


@router.get("/api/messages", response_model=List[MessagesOut])
def list_messages(repo: MessagesRepo = Depends()):
    return repo.list_messages()


@router.delete("/api/messages/{id}", response_model=bool)
def delete_message(
    id: int,
    repo: MessagesRepo = Depends(),
) -> bool:
    return repo.delete_message(id)
