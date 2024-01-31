import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteMessageMutation } from '../../app/apiSlice';
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'

function DeleteMessage() {
    const { id } = useParams();
    const [deleteMessage, { isLoading: isDeleting, isError }] = useDeleteMessageMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isSuccess) {
            navigate('/messages');
        }
    }, [isSuccess, navigate]);

    const handleDelete = async () => {
        await deleteMessage(id).unwrap();
    };

    if (isDeleting) return <p>Deleting message...</p>;
    if (isError) return <p>Error deleting message.</p>;

    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-center'>
                <p>Are you sure you want to delete this message?</p>
                <Button 
                    label='Delete Message'
                    size='medium'                        
                    imageURL={arrowRight}
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
}

export default DeleteMessage;
