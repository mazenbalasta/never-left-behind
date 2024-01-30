import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateMessageMutation } from '../../app/apiSlice';
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'



function UpdateMessage({ initialMessage = null, onMessageSubmit }) {
    const [message, setMessage] = useState({
        title: initialMessage?.title || '',
        body: initialMessage?.body || '',
        id: initialMessage?.id || null
    });

    const navigate = useNavigate();

    const handleList = () => {
        navigate(`/messages`);
    };
    const [updateMessage] = useUpdateMessageMutation();

      useEffect(() => {
        if (initialMessage) {
            setMessage(initialMessage);
        }
    }, [initialMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateMessage({ id: message.id, ...message });
        window.alert(`Message ${message.id} updated!`);
        onMessageSubmit();
        setMessage({ title: '', body: '', id: null });
    };

  return (
        <>
            <h1 className='mt-10 mb-10'>MESSAGE A F**KING VETERAN</h1>
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
                                What say you MF
                            </label>
                            <textarea
                                name="body"
                                value={message.body}
                                onChange={handleChange}
                                placeholder='Message here...'
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
};

export default UpdateMessage
