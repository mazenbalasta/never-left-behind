import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetMessageQuery, useUpdateMessageMutation } from "../../app/apiSlice"
import { Button } from "../../components"
import { arrowRight } from "../../assets/icons"

function EditMessage() {
    const { id } = useParams();
    const { data: message, isLoading } = useGetMessageQuery(id);
    const [updateMessage] = useUpdateMessageMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', body: '' });

    useEffect(() => {
        if (message) {
            setFormData({ title: message.title, body: message.body });
        }
    }, [message]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateMessage({ id, ...formData }).unwrap();
        navigate('/messages');
    };

    const navToMessageList = () => {
        navigate('/messages');
    };

    if (isLoading) return <p>Loading...</p>

    return (
        <div className='max-w-md mx-auto mt-10'>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h1 className='text-xl font-bold mb-5'>Edit Message</h1>
                <form onSubmit={handleSubmit} id='edit-message-form'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                            text='Update Message'
                            size='medium'                        
                            imageURL={arrowRight}
                        />
                        <Button
                            type='button'
                            text='Cancel'
                            size='medium'
                            imageURL={arrowRight}
                            onClick={navToMessageList}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMessage
