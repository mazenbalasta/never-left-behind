from fastapi import APIRouter, Depends, HTTPException, Response, status
from typing import List
from queries.messages import MessagesIn, MessagesOut, MessagesRepo

router = APIRouter()


@router.post("/api/messages", response_model=MessagesOut)
def create_message(message: MessagesIn, repo: MessagesRepo = Depends()):
    return repo.create(message)

@router.get("/api/messages", response_model=List[MessagesOut])
def list_messages(repo: MessagesRepo = Depends()):
    return repo.list_messages()

@router.put("/api/messages/{id}", response_model=MessagesOut)
def update_message(id: int, message: MessagesIn, repo: MessagesRepo = Depends()):
    return repo.update_message(id, message)

@router.delete("/api/messages/{id}", status_code=status.HTTP_200_OK)
def delete_message(id: int, repo: MessagesRepo = Depends()):
    try:
        success = repo.delete_message(id)
        if not success:
            raise HTTPException(status_code=404, detail="Message not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
