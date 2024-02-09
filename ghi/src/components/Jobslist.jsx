import { useState } from 'react'
import {
    useGetAllJobsQuery,
    useGetTokenQuery,
    useDeleteJobMutation,
} from '../app/apiSlice'
import { useNavigate } from 'react-router'
import JobDetailModal from './JobDetailModal'

const JobsList = () => {
    const { data: jobs } = useGetAllJobsQuery()
    const { data: account } = useGetTokenQuery()
    const [deleteJob] = useDeleteJobMutation()
    const navigate = useNavigate()
    const isApprovedPartner =
        account && account.account.account_type === 'approved_partner'

    const [selectedJob, setSelectedJob] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userJobs, setUserJobs] = useState(null)

    if (jobs) {
        const created = jobs.map((job) => job.created_by)
    }

    if (!jobs) {
        return <p>Loading...</p>
    }

    const handleCardClick = (jobId) => {
        const selectedJob = jobs.find((job) => job.id === jobId)
        setSelectedJob(selectedJob)
        setIsModalOpen(true)
    }

    const postedJobByUser = (jobs, userId) => {
        return jobs.filter((job) => job.created_by === userId)
    }

    const handleUserFilterClick = () => {
        if (account && account.account.id) {
            const filteredJobs = postedJobByUser(jobs, account.account.id)
            setUserJobs(filteredJobs)
            if (filteredJobs.length === 0) {
                window.alert(
                    'You currently have no job posted, please create a new job or browse through our jobs list.'
                )
                setUserJobs(null)
            }
        }
    }

    const handleCreateJobClick = () => {
        navigate('/jobs/create')
    }

    const closeSlider = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    const handleShowAllJobs = () => {
        setUserJobs(null)
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this job?'
        )
        if (confirm) {
            try {
                await deleteJob(id)
                window.alert('Job deleted successfully')
                setUserJobs(null)
            } catch (error) {
                window.alert('An error has occured, please try again later')
                navigate('/jobs')
            }
        }
    }

    return (
        <>
            <main className="relative min-h-screen w-screen flex flex-col items-center">
                <h1 className="text-white mb-4 mt-5 text-center text-lg">
                    JOBS LIST
                </h1>
                <div className="flex justify-center mb-5">
                    {isApprovedPartner && (
                        <button
                            type="button"
                            onClick={handleCreateJobClick}
                            className="justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Create a New Job
                        </button>
                    )}
                </div>
                {isApprovedPartner && (
                    <>
                        {userJobs ? (
                            <div className="flex justify-center mb-5">
                                <button
                                    type="button"
                                    onClick={handleShowAllJobs}
                                    className="justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Show All Jobs
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center mb-5">
                                <button
                                    type="button"
                                    onClick={handleUserFilterClick}
                                    className="justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Show Jobs Posted By You
                                </button>
                            </div>
                        )}
                    </>
                )}
                <div className="jobslist-container">
                    {(userJobs || jobs).map((job) => (
                        <div
                            key={job.id}
                            className="relative w-3/4 mx-auto mb-10 grid max-w-screen-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden rounded-lg border py-8 text-white shadow transition hover:shadow-lg"
                        >
                            <button
                                onClick={() => handleCardClick(job.id)}
                                className="col-span-11 sm:pl-4 m-5 flex flex-col text-left"
                            >
                                <h1 className="text-sm text-white-900 mb-3">
                                    Company: {job.company_name}
                                </h1>
                                <a
                                    href="#"
                                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl text-white"
                                >
                                    Position: {job.position}
                                </a>
                                <p className="overflow-hidden pr-7 leading-normal text-sm text-white">
                                    <strong>Job Description: </strong>
                                    {job.description}
                                </p>
                                <div className="mt-3 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-4 w-4 mr-1 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                                        />
                                    </svg>
                                    <span className="text-gray-500">
                                        Location: {job.location}
                                    </span>
                                </div>
                            </button>
                            {userJobs && (
                                <div className="absolute bottom-0 right-0 p-4">
                                    <button
                                        key={`delete-${job.id}`}
                                        type="button"
                                        onClick={() => handleDelete(job.id)}
                                        className="mr-2 w-24 justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-red-300 shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {selectedJob && (
                    <JobDetailModal
                        isOpen={isModalOpen}
                        job={selectedJob}
                        onRequestClose={closeSlider}
                    />
                )}
            </main>
        </>
    )
}

export default JobsList
