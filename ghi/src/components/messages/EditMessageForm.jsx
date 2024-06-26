import { useState, useEffect } from "react"
import { useGetTokenQuery, useGetMessageQuery, useUpdateMessageMutation } from "../../app/apiSlice"
import { Button } from ".."


function EditMessage( { messageId, onClose }) {
    const { data: tokenData } = useGetTokenQuery();
    const { data: message, isLoading, isError } = useGetMessageQuery(messageId);
    const [updateMessage] = useUpdateMessageMutation();
    const [formData, setFormData] = useState({ title: '', body: '', account: null, date: null});


    useEffect(() => {
        if (message && tokenData) {
            setFormData({ title: message.title, body: message.body, account: tokenData.account.id, date: new Date().toISOString()
            });
        }
    }, [message, tokenData]);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateMessage({ id: messageId, ...formData }).unwrap();
            onClose(true);
        } catch (error) {
            console.error('Failed to update the message:', error)
            onClose(false);
        };
    };


    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading the message</p>

    return (
            <div className='bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <form onSubmit={handleSubmit} id='edit-message-form'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Enter a title'
                            required type='text'
                            name='title'
                            id='title'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='body'>Message Body</label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-[rgb(199,158,80)] leading-tight focus:outline-none focus:shadow-outline'
                            value={formData.body}
                            onChange={handleChange}
                            placeholder='Message body...'
                            required name='body'
                            id='body'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button
                            type='submit'
                            label='Update'
                            size='small'
                            backgroundColor='bg-blue-500'
                        />
                        <Button
                            type='button'
                            label='Cancel'
                            size='small'
                            onClick={onClose}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMessage
