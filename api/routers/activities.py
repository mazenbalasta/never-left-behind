from fastapi import APIRouter, Depends
from queries.activities import ActivityIn, ActivityRepo


router = APIRouter()


@router.post("/activities")
def create_activity(
    activity: ActivityIn,
    repo: ActivityRepo = Depends()
):
    return repo.create(activity)
