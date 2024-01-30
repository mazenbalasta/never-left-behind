
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateMessageMutation } from '../../app/apiSlice';
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'

function CreateMessage({ onMessageSubmit }) {
    const [message, setMessage] = useState({
        title:'',
        body: '',
    });

    const navigate = useNavigate();

    const handleList = () => {
        navigate(`/messages/create`);
    };

    const [createMessage] = useCreateMessageMutation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMessage({ ...message, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createMessage(message);
        window.alert(`Message ${message.title} added!`);
        onMessageSubmit();
        setMessage({ title: '', body: ''});
    };

    return (
        <>
            <h1 className='mt-10 mb-10'>CREATE A MESSAGE</h1>
                <div className="form-container mb-20">
                    <form className='form-column' onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <label
                                htmlFor="title" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Title
                            </label>
                            <input 
                                type="text"
                                name="title"
                                value={message.title}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor="title" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                What say you
                            </label>
                            <textarea
                                name="body"
                                value={message.body}
                                onChange={handleChange}
                                placeholder='Message here...'
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div>
                            <Button 
                            type='submit' 
                            size='medium'
                            label='Add Message' 
                            iconURL={arrowRight} />
                            <Button 
                            size='medium'
                            label='Messages' 
                            iconURL={arrowRight}
                            onClick={() => handleList()} />
                        </div>
                    </form>
                </div>
        </>
    );
}

export default CreateMessage
