from fastapi import APIRouter
from queries.events import EventsIn, EventsOut

router = APIRouter()

@router.post("/api/events", response_model=EventsIn)
def create_event():
    return {

    }

@router.get("/api/events", response_model=EventsOut)
def list_events():
    return {

    }

@router.put("/api/events/{id}", response_model=EventsOut)
def update_event(id: int):
    return {

    }

@router.delete("/api/events/{id}", response_model=EventsOut)
def delete_event(id: int):
    return {

    }
