import {useState, useEffect} from 'react';
import { useGetTokenQuery, useCreateMessageMutation } from '../../app/apiSlice'
import { Button } from '..'


function CreateMessageForm({ onClose }) {
    const { data: tokenData } = useGetTokenQuery()
    const [createMessage, { isLoading, isError }] = useCreateMessageMutation()
    const [message, setMessage] = useState({
        title: '',
        body: '',
        account: tokenData.account.id,
        date: new Date().toISOString()
    });

    useEffect(() => {
        if (tokenData) {
            setMessage((prevMessage) => ({ ...prevMessage, account: tokenData.account.id }))
        }
    }, [tokenData]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setMessage((prevMessage) => ({ ...prevMessage, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createMessage(message).unwrap();
            onClose(true);
        } catch (error) {
            console.error('Error submitting form', error);
            onClose(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading the message</p>;

    return (
        <>
            <div className="max-w-md mx-auto mt-10">
            <div className='bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'>
                    <form onSubmit={handleSubmit} id="create-message-form">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                value={message.title}
                                onChange={handleChange}
                                placeholder="Enter a title"
                                required
                                type="text"
                                name="title"
                                id="title"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="body"
                            >
                                Message Body
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-[rgb(199,158,80)] leading-tight focus:outline-none focus:shadow-outline"
                                value={message.body}
                                onChange={handleChange}
                                placeholder="Message body..."
                                required name="body"
                                id="body"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                type="submit"
                                label="Create"
                                size="small"
                                backgroundColor="bg-blue-500"
                            />
                            <Button
                                type="button"
                                label="Cancel"
                                size="small"
                                onClick={onClose}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default CreateMessageForm
