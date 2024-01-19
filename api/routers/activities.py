from fastapi import APIRouter, Depends
from typing import List
from queries.activities import ActivitiesIn, ActivitiesOut, ActivityRepo

router = APIRouter()


@router.post("/api/activities", response_model=ActivitiesOut)
def create_activity(
    activity: ActivitiesIn,
    repo: ActivityRepo = Depends()
):
    return repo.create_activity(activity)


@router.get("/api/activities", response_model=List[ActivitiesOut])
def list_activities(
    repo: ActivityRepo = Depends ()
):
    return repo.list_activities()


@router.put("/api/activities/{id}", response_model=ActivitiesOut)
def update_activity(id: int):
    return {

    }


@router.delete("/api/activities/{id}", response_model=ActivitiesOut)
def delete_activity(id: int):
    return {

    }
