from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
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
    def create(self, job: JobsIn) -> JobsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
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
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
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
                            role=record[3],
                            requirements=record[4],
                            qualifications=record[5],
                            pref_qualifications=record[6],
                            location=record[7],
                            apply_url=record[8],
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
                            role = %s,
                            requirements = %s,
                            qualifications = %s,
                            pref_qualifications = %s,
                            location = %s,
                            apply_url = %s
                        WHERE id = %s
                        RETURNING id;
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
                        ],
                    )
                    id = db.fetchone()[0]
                    old_data = job.dict()
                    return JobsOut(id=id, **old_data)
        except Exception as e:
            print(f"Error: {e}")
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
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))
