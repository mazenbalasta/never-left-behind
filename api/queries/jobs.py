from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class JobsIn(BaseModel):
    position: str
    company_name: str
    description: str
    requirements: str
    qualifications: str
    pref_qualifications: str
    location: str
    apply_url: str
    created_by: int


class JobsOut(BaseModel):
    id: int
    position: str
    company_name: str
    description: str
    requirements: str
    qualifications: str
    pref_qualifications: str
    location: str
    apply_url: str
    created_by: int


class JobsRepo:
    def create(self, job: JobsIn) -> JobsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO jobs
                        (
                            position,
                            company_name,
                            description,
                            requirements,
                            qualifications,
                            pref_qualifications,
                            location,
                            apply_url,
                            created_by
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s,%s)
                    RETURNING id;
                    """,
                    [
                        job.position,
                        job.company_name,
                        job.description,
                        job.requirements,
                        job.qualifications,
                        job.pref_qualifications,
                        job.location,
                        job.apply_url,
                        job.created_by,
                    ],
                )
                id = db.fetchone()[0]
                old_data = job.dict()
                return JobsOut(id=id, **old_data)

    def list_jobs(self) -> Union[Error, List[JobsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM Jobs
                        ORDER BY position ASC;
                        """
                    )
                    records = db.fetchall()
                    result = []
                    for record in records:
                        jobs = JobsOut(
                            id=record[0],
                            position=record[1],
                            company_name=record[2],
                            description=record[3],
                            requirements=record[4],
                            qualifications=record[5],
                            pref_qualifications=record[6],
                            location=record[7],
                            apply_url=record[8],
                            created_by=record[9],
                        )
                        result.append(jobs)
                    return result
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def update_job(self, job_id: int, job: JobsIn) -> Union[JobsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE jobs
                        SET
                            position = %s,
                            company_name = %s,
                            description = %s,
                            requirements = %s,
                            qualifications = %s,
                            pref_qualifications = %s,
                            location = %s,
                            apply_url = %s,
                            created_by = %s
                        WHERE id = %s
                        RETURNING id;
                        """,
                        [
                            job.position,
                            job.company_name,
                            job.description,
                            job.requirements,
                            job.qualifications,
                            job.pref_qualifications,
                            job.location,
                            job.apply_url,
                            job.created_by,
                            job_id,
                        ],
                    )
                    id = db.fetchone()[0]
                    old_data = job.dict()
                    return JobsOut(id=id, **old_data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def delete_job(self, job_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM jobs WHERE id = %s
                        """,
                        [job_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404, detail="Job not found"
                        )
                    return True
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


    def job_detail(self, job_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM jobs
                        WHERE id = %s
                        """,
                        [job_id],
                    )
                    record = db.fetchone()
                    job = JobsOut(
                            id=record[0],
                            position=record[1],
                            company_name=record[2],
                            description=record[3],
                            requirements=record[4],
                            qualifications=record[5],
                            pref_qualifications=record[6],
                            location=record[7],
                            apply_url=record[8],
                            created_by=record[9],
                        )
                    return job
        except Exception as e:
            return {"error": "An error occurred while fetching job details"}
