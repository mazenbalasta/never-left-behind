from fastapi import APIRouter, Depends
from typing import List
from queries.jobs import JobsIn, JobsOut, JobsRepo

router = APIRouter()


@router.post("/api/jobs", response_model=JobsOut)
def create_job(
    job: JobsIn,
    repo: JobsRepo = Depends()
):
    return repo.create_job(job)


@router.get("/api/jobs", response_model=List[JobsOut])
def list_jobs(
    repo: JobsRepo = Depends()
):
    return repo.list_jobs()


@router.put("/api/jobs/{id}", response_model=JobsOut)
def update_job(id: int, job: JobsIn, repo: JobsRepo = Depends()):
    return repo.update_job(id, job)


@router.delete("/api/jobs/{job_id}", response_model=bool)
def delete_job(
    job_id: int,
    repo: JobsRepo = Depends(),
) -> bool:
    return repo.delete_job(job_id)
