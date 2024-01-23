from pydantic import BaseModel
from queries.pool import pool
from typing import Optional, List, Union
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class JobsIn(BaseModel):
    position: str
    company_name: str
    role: str
    requirements: str
    qualifications: str
    pref_qualifications: str
    location: str
    apply_url: str


class JobsOut(BaseModel):
    id: int
    position: str
    company_name: str
    role: str
    requirements: str
    qualifications: str
    pref_qualifications: str
    location: str
    apply_url: str


class JobsRepo:
    def create_job(self, job: JobsIn) -> JobsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO jobs
                    (
                        position,
                        company_name,
                        role,
                        requirements,
                        qualifications,
                        pref_qualifications,
                        location,
                        apply_url
                    )
                    VALUES
                    (%s,%s,%s,%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        job.position,
                        job.role,
                        job.company_name,
                        job.requirements,
                        job.qualifications,
                        job.pref_qualifications,
                        job.location,
                        job.apply_url
                    ]
                )
                id = result.fetchone()[0]
                old_data = job.dict()
                return JobsOut(id=id, **old_data)

    def list_jobs(self) -> Union[Error, List[JobsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM Jobs;
                        """
                    )
                    result = []
                    for record in db:
                        job = JobsOut(
                            id=record[0],
                            position=record[1],
                            company_name=record[2],
                            role=record[3],
                            qualifications=record[4],
                            pref_qualifications=record[5],
                            location=record[6],
                            apply_url=record[7]
                        )
                        result.append(job)
                    return result
        except Exception:
            return {"message": "Could not get all jobs"}

    def update_job(self, job_id: int, job: JobsIn) -> Union[JobsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE Jobs
                        SET
                            position = %s,
                            company_name = %s,
                            role = %s,
                            requirements = %s,
                            qualifications = %s,
                            pref_qualifications = %s,
                            location = %s,
                            apply_url = %s
                        WHERE id = %s
                        RETURNING
                        id,
                        position,
                        company_name,
                        role,
                        requirements,
                        qualifications,
                        pref_qualifications,
                        location,
                        apply_url;
                        """,
                        [
                            job.position,
                            job.company_name,
                            job.role,
                            job.requirements,
                            job.qualifications,
                            job.pref_qualifications,
                            job.location,
                            job.apply_url,
                            job_id,
                        ]
                    )
                    result = db.fetchone()
                    if result is None:
                        raise HTTPException(status_code=404, detail="Job not found")
                    updated_job = JobsOut(
                        id=result[0],
                        position=result[1],
                        company_name=result[2],
                        role=result[3],
                        requirements=result[4],
                        qualifications=result[5],
                        pref_qualifications=result[6],
                        location=result[7],
                        apply_url=result[8]
                    )
                    return updated_job
        except HTTPException as error:
            raise error
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

    def delete_job(self, job_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM Jobs WHERE id = %s
                        """,
                        [job_id]
                    )
                    return True
        except Exception as e:
            return Error(message=str(e))
