import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetJobByIdQuery } from '../app/apiSlice'

const JobDetail = () => {
    const { id } = useParams()
    const { data: job, error, isLoading } = useGetJobByIdQuery(id)

    useEffect(() => {
        // Fetch job details based on the ID
        // You can use the `useGetJobByIdQuery` or your preferred method here
    }, [id])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error fetching job details</p>
    }

    if (!job) {
        return <p>Job not found</p>
    }

    return (
        <div className="job-detail-container">
            <h2>{job.role}</h2>
            <p>Company: {job.company_name}</p>
            <p>Description: {job.description}</p>
            <p>Location: {job.location}</p>
            {/* Add more job details as needed */}
        </div>
    )
}

export default JobDetail
