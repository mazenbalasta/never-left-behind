from fastapi import APIRouter, Depends
from queries.events import EventsIn, EventsOut, EventsRepo

router = APIRouter()


@router.post("/api/events", response_model=EventsOut)
def create_event(
    event: EventsIn,
    repo: EventsRepo = Depends()
):
    return {
        repo.create(event)

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
