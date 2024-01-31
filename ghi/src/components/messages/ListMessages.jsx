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
        <div className='container mx-auto mt-10'>
            <div className='flex justify-end mb-4'>
                <Button 
                    label='Create Message'
                    size='medium'                        
                    iconURL={arrowRight}
                    onClick={navToCreateMessage}
                />
            </div>
            <table className='min-w-full border-collapse border border-gray-300'>
                <thead className='bg-gray-500'>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2 text-gray-900 font-bold dark:text-white'>Title</th>
                        <th className='border border-gray-300 px-4 py-2 text-gray-900 font-bold dark:text-white'>Body</th>
                        <th className='border border-gray-300 px-4 py-2 text-gray-900 font-bold dark:text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(message => (
                        <tr key={message.id} className='bg-white'>
                            <td className='border border-gray-300 px-4 py-2'>{message.title}</td>
                            <td className='border border-gray-300 px-4 py-2'>{message.body}</td>
                            <td className='border border-gray-300 px-4 py-2'>
                                <Button 
                                    label='Edit'
                                    size='small'
                                    onClick={() => handleEdit(message.id)}
                                    iconURL={arrowRight}
                                />
                                <Button 
                                    label='Delete'
                                    size='small'
                                    onClick={() => handleDelete(message.id)}
                                    iconURL={arrowRight}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListMessages
