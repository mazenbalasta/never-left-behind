import Modal from 'react-modal'

const JobDetailModal = ({ isOpen, job, onRequestClose }) => {
    const handleApplyClick = () => {
        window.open(job.apply_url, '_blank', 'noreferrer noopener')
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Job Details"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-3xl overflow-auto"
            overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="w-full max-h-full overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                        <strong>Position: </strong>
                        {job.position}
                    </h2>
                    <button
                        className="text-white hover:text-gray-500 focus:outline-none"
                        onClick={onRequestClose}
                    >
                        <span className="text-3xl">&times;</span>
                    </button>
                </div>
                <p className="text-gray-500 mb-4">
                    <strong>Location: </strong>
                    {job.location}
                </p>
                <p className="text-gray-500 mb-4">
                    <strong>Hiring Company: </strong>
                    {job.company_name}
                </p>
                <p className="text-white mb-4">
                    <strong>Job Description: </strong>
                    {job.description}
                </p>
                <p className="text-white mb-4">
                    <strong>Applicant Requirements: </strong>
                    {job.requirements}
                </p>
                <p className="text-white mb-4">
                    <strong>Additional Skills: </strong>
                    {job.qualifications}
                </p>
                <p className="text-white mb-4">
                    <strong>Preffered Skills: </strong>
                    {job.pref_qualifications}
                </p>
                <button
                    className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline-blue"
                    onClick={handleApplyClick}
                >
                    Apply Now
                </button>
            </div>
        </Modal>
    )
}

export default JobDetailModal
