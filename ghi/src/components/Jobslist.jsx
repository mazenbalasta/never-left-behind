import React, { useState } from 'react'
import { useGetAllJobsQuery } from '../app/apiSlice'
import { useGetTokenQuery } from '../app/apiSlice'
import { useNavigate } from 'react-router'
import JobDetailModal from './JobDetailModal'

const Jobslist = () => {
    const { data: jobs } = useGetAllJobsQuery()
    const { data: account } = useGetTokenQuery()
    const navigate = useNavigate()
    const isPartner = account && account.account.account_type === 'partner'

    const [selectedJob, setSelectedJob] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!jobs) {
        return <p>Loading...</p>
    }

    const handleCardClick = (jobId) => {
        const selectedJob = jobs.find((job) => job.id === jobId)
        setSelectedJob(selectedJob)
        setIsModalOpen(true)
    }

    const handleCreateJobClick = () => {
        navigate(`/jobs/create`)
    }

    const closeSlider = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    return (
        <>
            <main className="relative min-h-screen w-screen flex flex-col items-center">
                <h1 className="text-white mb-4 mt-5 text-center text-lg">
                    JOBS LIST
                </h1>
                <div className="flex justify-center">
                    {isPartner && (
                        <button
                            type="button"
                            onClick={() => handleCreateJobClick()}
                            className="alignment-center justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Create a new job +
                        </button>
                    )}
                </div>
                <div className="jobslist-container m-5">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => handleCardClick(job.id)}
                            className="w-3/4 mx-auto mt-10 grid max-w-screen-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-hidden rounded-lg border py-8 text-white shadow transition hover:shadow-lg"
                        >
                            <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                                <h1 className="text-sm text-white-900">
                                    Company: {job.company_name}
                                </h1>
                                <a
                                    href="#"
                                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl text-white"
                                >
                                    Position: {job.position}
                                </a>
                                <p className="overflow-hidden pr-7 text-sm text-white">
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
                                
                            </div>
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

export default Jobslist
