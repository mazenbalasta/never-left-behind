from fastapi import APIRouter
from queries.resources import ResourcesIn, ResourcesOut

router = APIRouter()


@router.post("/api/resources", response_model=ResourcesIn)
def create_resource():
    return {

    }


@router.get("/api/resources", response_model=ResourcesOut)
def list_resources():
    return {

    }


@router.delete("/api/resources/{id}", response_model=ResourcesOut)
def delete_resource(id: int):
    return {

    }
