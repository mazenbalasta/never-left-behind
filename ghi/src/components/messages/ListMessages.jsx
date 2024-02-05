import { useState } from 'react'
import { useGetAllMessagesQuery, useDeleteMessageMutation, useGetTokenQuery } from '../../app/apiSlice';
import { Button, Modal } from '../../components'
import { arrowRight } from '../../assets/icons'
import EditMessage from './EditMessage';
import CreateMessageForm from './CreateMessageForm';


function ListMessages() {
    const { data: messages, isLoading, isError, refetch } = useGetAllMessagesQuery();
    const [deleteMessage] = useDeleteMessageMutation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [deletingMessageId, setDeletingMessageId] = useState(null);
    const { data: tokenData } = useGetTokenQuery();

    const isAuthenticated = tokenData && tokenData.account;
    const userId = tokenData?.account?.id;


    const handleCreateMessage = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditMessage = (id) => {
        setEditingMessageId(id);
        setIsEditModalOpen(true);
    };

    const handleCloseCreateModal = (updated) => {
        setIsCreateModalOpen(false);
        if (updated) {
            refetch();
        }
    };

    const handleCloseEditModal = (updated) => {
        setIsEditModalOpen(false);
        setEditingMessageId(null);
        if (updated) {
            refetch();
        }
    };

    const handleDeleteMessage = async (id) => {
        setDeletingMessageId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteMessage = async () => {
        try {
            await deleteMessage(deletingMessageId).unwrap();
            refetch();
        } catch (error) {
            console.error('Error deleting message', error);
        } finally {
            setIsDeleteModalOpen(false);
        }
    };


    if (isLoading) return <p>Loading messages...</p>;
    if (isError) return <p>Error loading messages.</p>;

    return (
        <main>
            <h1 className='text-3xl font-bold text-white text-center mt-10'>Messages</h1>
            <div className='container mx-auto mt-10 p-4'>
                {isAuthenticated && (
                <div className='flex justify-center mb-4'>
                    <Button
                        label='Create Message'
                        size='medium'
                        iconURL={arrowRight}
                        onClick={handleCreateMessage}
                    />
                    <Modal
                        isOpen={isCreateModalOpen}
                        title='Create Message'
                        onClose={handleCloseCreateModal}
                    >
                        {isAuthenticated && (
                        <CreateMessageForm 
                            onClose={handleCloseCreateModal}
                            accountId={userId}
                        />
                        )}
                    </Modal>
                </div>
                )}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>
                    {messages.map(message => (
                        <div key={message.id} className='bg-gray-500 shadow overflow-hidden sm:rounded-md p-4 mb-1'>
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
                                <div className='flex-shrink-0 space-y-1 ml-4 my-1'>
                                    {userId === message.account && (
                                        <>
                                            <Button
                                                label='Edit'
                                                size='small'
                                                onClick={() => handleEditMessage(message.id)}
                                            />
                                            <Button
                                                label='Delete'
                                                size='small'
                                                onClick={() => handleDeleteMessage(message.id)}
                                            />
                                        </>
                                    )}
                                    {isAuthenticated && (
                                    <Button
                                        label='Reply'
                                        size='small'
                                        onClick={() => handleEdit(message.id)}
                                    />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal 
                    isOpen={isEditModalOpen}
                    title='Edit Message'
                    onClose={() => handleCloseEditModal(false)}
                >
                    {editingMessageId && (
                        <EditMessage 
                            messageId={editingMessageId}
                            onClose={handleCloseEditModal}
                        />
                    )}
                </Modal>
                <Modal
                    isOpen={isDeleteModalOpen}
                    title='Confirm Delete'
                    onClose={() => setIsDeleteModalOpen(false)}
                >
                    <p>Are you sure you want to delete this message?</p>
                        <Button
                            label='Delete'
                            size='small'
                            onClick={confirmDeleteMessage}
                        />
                        <Button
                            label='Cancel'
                            size='small'
                            onClick={() => setIsDeleteModalOpen(false)}
                        />
                </Modal>
            </div>
        </main>
    );
}

export default ListMessages;
