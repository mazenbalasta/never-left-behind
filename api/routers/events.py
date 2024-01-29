from fastapi import APIRouter, Depends, HTTPException, Response, status
from models import EventsIn, EventsOut, EventsOutWithStateInfo
from queries.events import EventsRepo
from typing import List

router = APIRouter()


@router.post("/api/events", response_model=EventsOut)
def create_event(event: EventsIn, repo: EventsRepo = Depends()):
    return repo.create(event)


@router.get("/api/events", response_model=List[EventsOutWithStateInfo])
def list_events(repo: EventsRepo = Depends()):
    return repo.list_events()


@router.put("/api/events/{id}", response_model=EventsOut)
def update_event(id: int, event: EventsIn, repo: EventsRepo = Depends()):
    return repo.update_event(id, event)


@router.delete("/api/events/{id}", response_model=bool)
def delete_event(id: int, repo: EventsRepo = Depends()) -> bool:
    return repo. delete_event(id)
