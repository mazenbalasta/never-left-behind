from fastapi import APIRouter, Depends, HTTPException, Response, status
from typing import List
from queries.messages import MessagesIn, MessagesOut, MessagesRepo
from queries.messages import ResponsesOut, ResponsesIn

router = APIRouter()


@router.post("/api/messages", response_model=MessagesOut)
def create_message(message: MessagesIn, repo: MessagesRepo = Depends()):
    return repo.create(message)


@router.get("/api/messages", response_model=List[MessagesOut])
def list_messages(repo: MessagesRepo = Depends()):
    return repo.list_messages()


@router.put("/api/messages/{id}", response_model=MessagesOut)
def update_message(
    id: int, message: MessagesIn, repo: MessagesRepo = Depends()
):
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

@router.get("/api/messages/{message_id}", response_model=MessagesOut)
async def read_message(message_id: int, repo: MessagesRepo = Depends()):
    return repo.get_message_with_responses(message_id)

@router.post("/api/messages/{message_id}/responses", response_model=ResponsesOut)
async def add_response(message_id: int, response_in: ResponsesIn, repo: MessagesRepo = Depends()):
    return repo.create_response(message_id, response_in)

@router.get("/api/messages/{message_id}/stats")
async def get_message_stats(message_id: int, repo: MessagesRepo = Depends()):
    try:
        stats = repo.get_message_stats(message_id)
        if stats is None:
            raise HTTPException(status_code=404, detail="Message not found")
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
