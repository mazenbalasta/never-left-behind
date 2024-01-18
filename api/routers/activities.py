from fastapi import APIRouter
from queries.activities import ActivitiesIn, ActivitiesOut

router = APIRouter()


@router.post("/api/activities", response_model=ActivitiesIn)
def create_activity():
    return {

    }


@router.get("/api/activities", response_model=ActivitiesOut)
def list_activities():
    return {
    
    }


@router.put("/api/activities/{id}", response_model=ActivitiesOut)
def update_activity(id: int):
    return {

    }


@router.delete("/api/activities/{id}", response_model=ActivitiesOut)
def delete_activity(id: int):
    return {

    }
