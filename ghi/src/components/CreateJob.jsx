import { useState } from "react"
import { useGetTokenQuery, useCreateJobMutation } from '../app/apiSlice'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const CreateJob = () => {
    const navigate = useNavigate()
    const { data: account, isLoading } = useGetTokenQuery();
    const [createJob] = useCreateJobMutation();

    const createdBy = account ? account.account.id : null

    const [formData, setFormData] = useState({
        position: '',
        company_name: '',
        description: '',
        requirements: '',
        qualifications: '',
        pref_qualifications: '',
        location: '',
        apply_url: '',
        created_by: createdBy,
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmSubmit = window.confirm(
            'Are you sure you want to create this job?'
        )

        if (confirmSubmit) {
            try {
                await createJob(formData).unwrap();
                window.alert('Job created successfully!');
            } catch {
                window.alert('Job creation failed, please try again later.')
            }
        } navigate('/jobs')
    }

    const handleInputChange = (e) => {
        const inputName = e.target.name
        const value = e.target.value

        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    return (
        <>
            <div className="App-header">
                <h1 className="mt-10 mb-10">CREATE A NEW JOB</h1>
                <div className="form-container mb-20">
                    <form
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="position"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Job Position:
                            </label>
                            <input
                                type="position"
                                name="position"
                                id="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-80 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="company_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Company Name:
                            </label>
                            <input
                                type="company_name"
                                name="company_name"
                                id="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                className="w-80 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-0">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Job Description:
                            </label>
                            <textarea
                                type="description"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="h-40 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-0">
                            <label
                                htmlFor="requirements"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Requirements:
                            </label>
                            <textarea
                                type="requirements"
                                name="requirements"
                                id="requirements"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                className="h-40 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="qualifications"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Qualifications:
                            </label>
                            <textarea
                                name="qualifications"
                                id="qualifications"
                                value={formData.qualifications}
                                onChange={handleInputChange}
                                className="h-32 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-0">
                            <label
                                htmlFor="pref_qualifications"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Preferred Qualifications:
                            </label>
                            <textarea
                                id="pref_qualifications"
                                name="pref_qualifications"
                                onChange={handleInputChange}
                                value={formData.pref_qualifications}
                                className="h-32 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="location"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Location:
                            </label>
                            <input
                                type="location"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="apply_url"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Link To Apply:
                            </label>
                            <input
                                type="apply_url"
                                name="apply_url"
                                id="apply_url"
                                value={formData.apply_url}
                                onChange={handleInputChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateJob;
