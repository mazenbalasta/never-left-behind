from fastapi import APIRouter, Depends, HTTPException, Response, status
from queries.events import EventsIn, EventsOut, EventsRepo
from typing import List

router = APIRouter()


@router.post("/api/events", response_model=EventsOut)
def create_event(event: EventsIn, repo: EventsRepo = Depends()):
    return repo.create(event)


@router.get("/api/events", response_model=List[EventsOut])
def list_events(repo: EventsRepo = Depends()):
    return repo.list_events()


@router.put("/api/events/{id}", response_model=EventsOut)
def update_event(id: int, event: EventsIn, repo: EventsRepo = Depends()):
    return repo.update_event(id, event)


@router.delete("/api/events/{id}", status_code=status.HTTP_200_OK)
def delete_event(id: int, repo: EventsRepo = Depends()):
    try:
        success = repo.delete_event(id)
        if not success:
            raise HTTPException(status_code=404, detail="Event not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
