from fastapi import APIRouter, Depends
from queries.activities import ActivitiesIn, ActivitiesOut, ActivityRepo

router = APIRouter()


@router.post("/activities")
def create_activity(
    activity: ActivitiesIn,
    repo: ActivityRepo = Depends()
):
    return repo.create(activity)


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
