import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetAllMessagesQuery } from '../../app/apiSlice';
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'


function ListMessages() {
    const { data: messages, isLoading, isError, error, refetch } = useGetAllMessagesQuery();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isError) {
            console.error('Error fetching messages:', error);
        }
    }, [isError, error]);

    const handleDelete = (id) => {
        navigate(`/messages/${id}/delete`)
    };

    const handleEdit = (id) => {
        navigate(`/messages/${id}/update`);
    };

    const navToCreateMessage = () => {
        navigate('/messages/create');
    };
    
    if (isLoading) return <p>Loading messages...</p>;
    if (isError) return <p>Error loading messages.</p>;

    return (
        <main>
            <h1 className='text-3xl font-bold text-white text-center mt-10'>Messages</h1>
            <div className='container mx-auto mt-10 p-4'>
                <div className='flex justify-end mb-4'>
                    <Button 
                        label='Create Message'
                        size='medium'                        
                        iconURL={arrowRight}
                        onClick={navToCreateMessage}
                        />
                </div>
                <div className='space-y-4'>
                    {messages.map(message => (
                        <div key={message.id} className='bg-gray-500 shadow overflow-hidden sm:rounded-md p-4'>
                            <div className='flex items-center  justify-between '>
                                <div className='flex-1 min-w-0'>
                                    <div className='text-sm leading-5 font-medium text-white truncate'>{message.title}</div>
                                    <div className='mt-2 text-sm leading-5 text-gray-400'>
                                        {message.body}
                                    </div>
                                    <div className='mt-2 flex items-center text-sm leading-5 text-gray-700'>
                                        <svg className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' fill='currentColor' viewBox="0 0 20 20">
                                            <path d='M2 5a2 2 0 011.85-2H16a2 2 0 012 2v8a2 2 0 01-2 2H3.85A1.85 1.85 0 012 13V5z'/>
                                        </svg>
                                        {message.views} views
                                    </div>
                                    <div className='mt-1 flex items-center text-sm leading-5 text-gray-700'>
                                        <svg className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' fill='currentColor' viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM5.707 10.707a1 1 0 01-1.414-1.414L8.586 5.293a1 1 0 011.414 0l4.293 4.293a1 1 0 01-1.414 1.414L10 7.414l-4.293 4.293z" clipRule="evenodd" />
                                        </svg>
                                        {message.response_count} replies
                                    </div>
                                </div>
                                <div className='flex-shrink-0 ml-4'>
                                    <Button 
                                        label='Edit'
                                        size='small'
                                        onClick={() => handleEdit(message.id)}
                                    />
                                    <Button 
                                        label='Reply'
                                        size='small'
                                        onClick={() => handleEdit(message.id)}
                                    />
                                    <Button 
                                        label='Delete'
                                        size='small'
                                        onClick={() => handleDelete(message.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default ListMessages
