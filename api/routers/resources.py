from fastapi import APIRouter, Depends, HTTPException, Response, status
from typing import List
from queries.resources import ResourcesIn, ResourcesOut, ResourcesRepo

router = APIRouter()


@router.post("/api/resources", response_model=ResourcesOut)
def create_resource(resource: ResourcesIn, repo: ResourcesRepo = Depends()):
    return repo.create(resource)


@router.get("/api/resources", response_model=List[ResourcesOut])
def list_resources(repo: ResourcesRepo = Depends()):
    return repo.list_resources()


@router.delete("/api/resources/{id}", status_code=status.HTTP_200_OK)
def delete_resource(id: int, repo: ResourcesRepo = Depends()):
    try:
        success = repo.delete_resource(id)
        if not success:
            raise HTTPException(status_code=404, detail="Resource not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
