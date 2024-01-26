from fastapi import APIRouter, Depends, HTTPException, Response, status
from queries.jobs import JobsIn, JobsOut, JobsRepo
from typing import List

router = APIRouter()


@router.post("/api/jobs", response_model=JobsOut)
def create_job(job: JobsIn, repo: JobsRepo = Depends()):
    return repo.create(job)


@router.get("/api/jobs", response_model=List[JobsOut])
def list_jobs(repo: JobsRepo = Depends()):
    return repo.list_jobs()


@router.put("/api/jobs/{id}", response_model=bool)
def update_job(id: int, job: JobsIn, repo: JobsRepo = Depends()):
    return repo.update_job(id, job)


@router.delete("/api/jobs/{id}", status_code=status.HTTP_200_OK)
def delete_job(id: int, repo: JobsRepo = Depends()):
    try:
        success = repo.delete_job(id)
        if not success:
            raise HTTPException(status_code=404, detail="Job not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
