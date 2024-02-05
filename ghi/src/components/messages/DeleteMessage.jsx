import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteMessageMutation, useGetMessageQuery } from '../../app/apiSlice';
import { Button, Modal } from '../../components'


function DeleteMessage() {
    const { id } = useParams();
    const { data: message, isError: isFetchError } = useGetMessageQuery(id);
    const [deleteMessage, { isLoading: isDeleting, isError: isDeleteError, isSuccess }] = useDeleteMessageMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/messages');
        }
    }, [isSuccess, navigate]);

    const handleDelete = async () => {
        try {
            await deleteMessage(id).unwrap();
            seIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting message', error);
        };
    };

    if (isDeleting) return <p>Deleting message...</p>;
    if (isDeleteError || isFetchError) return <p>Error deleting message.</p>;

    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-center'>
                <Button 
                    label='Delete Message'
                    size='medium'                        
                    onClick={() => setModalOpen(true)}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                title='Confirm Delete'
                onClose={() => setModalOpen(false)}
            >
                <p>Are you sure you want to delete this message?</p>
                {message && (
                    <div className='mt-4'>
                        <p><strong>Title:</strong>{message.title}</p>
                        <p><strong>Body:</strong>{message.body}</p>
                    </div>
                )}
                <div className='flex justify-end mt-4'>
                    <Button
                        label='Cancel'
                        size='small'
                        onClick={() => setModalOpen(false)}
                    />
                    <Button
                        label='Delete'
                        size='small'
                        onClick={handleDelete}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default DeleteMessage;
