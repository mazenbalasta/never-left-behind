import { useGetAllJobsQuery } from '../app/apiSlice';
import { useGetTokenQuery } from '../app/apiSlice';

const Jobslist = () => {
    const { data: jobs } = useGetAllJobsQuery();
    const { data: account } = useGetTokenQuery();

    const isPartner = account && account.account.account_type === 'partner'

    if (!jobs) {
        return <p>Loading...</p>
    }

    return (
        <div className="jobslist-container relative-flex items-center">
            <h1 className="text-white mb-4 mt-5 text-center">JOBS LIST</h1>
            <div className="flex justify-center">
                {isPartner && (
                <button

                    type="button"
                    className="alignment-center justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Create new job +
                </button>
                )}
            </div>
            <div className="m-5">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="w-3/4 mx-auto mt-10 grid max-w-screen-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-hidden rounded-lg border py-8 text-white shadow transition hover:shadow-lg"
                    >
                        <a
                            href="#"
                            className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
                        ></a>
                        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                            <h3 className="text-sm text-gray-600">
                                {job.company_name}
                            </h3>
                            <a
                                href="#"
                                className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl text-white"
                            >
                                {job.role}
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
                                    {job.location}
                                </span>
                            </div>
                            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                <div className="">Hello</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jobslist
