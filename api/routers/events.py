from fastapi import APIRouter, Depends
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
def update_event(id: int):
    return {}


@router.delete("/api/events/{id}", response_model=EventsOut)
def delete_event(id: int):
    return {}
