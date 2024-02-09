import { useState } from 'react'
import { useDeleteMessageMutation, useGetTokenQuery, useGetMessageWithResponsesQuery } from '../../app/apiSlice';
import { Button, Modal } from '..'
import { chevronRight } from '../../assets/icons';
import EditMessage from './EditMessageForm';
import ReplyMessageForm from './ReplyMessageForm';


function MessageWithReplies({ messageId }) {
    const { data: messageData, isLoading, isError, refetch } = useGetMessageWithResponsesQuery(messageId);
    const [deleteMessage] = useDeleteMessageMutation();
    const { data: tokenData } = useGetTokenQuery();
    const [dataChanged, setDataChanged] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

    const isAuthenticated = tokenData && tokenData.account;
    const userId = tokenData?.account?.id;

      
    const handleEditMessage = () => {
        setDataChanged(true);
        setIsEditModalOpen(true);
    };

    
    const handleDeleteMessage = async () => {
        setDataChanged(true);
        setIsDeleteModalOpen(true);
    };    

    
    const handleReplyMessage = () => {
        setIsReplyModalOpen(true);
    };

    
    const handleCloseModals = (updated) => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsReplyModalOpen(false);

        if (updated) {
            refetch();
        }
    };


    const confirmDeleteMessage = async () => {
        try {
            await deleteMessage(messageId).unwrap();
            setDataChanged(true);
            handleCloseModals();
            refetch();
        } catch (error) {
            console.error('Error deleting message', error);
        }
    };

    


    if (isLoading) return <p>Loading message...</p>;
    if (isError) return <p>Message deleted.</p>;

    return (
        <div className='container p-4 text-white items-center'>
            {messageData && (                
                <div className="bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)]">
                    <div className='min-w-0 text-center'>
                        <h1 className='text-3xl leading-5 font-medium text-black overflow-auto mt-3 pb-2'>{messageData.title}</h1>
                        <p className='mt-2 text-sm leading-5 text-[rgb(199,158,80)]'>{messageData.body}</p>
                    </div>
                    <div className='text-lg text-black'>Replies:</div>
                    {messageData.responses
                    .slice().sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(response => (
                        <li key={response.id} className='text-sm text-gray-700'>
                            {response.body}
                        </li>
                    ))} 
                    <div className='flex justify-center mt-4'>
                        {isAuthenticated && messageData && userId === messageData.account && (
                            <>
                                <Button
                                    label='Edit'
                                    size='small'
                                    onClick={() => handleEditMessage(messageId)}
                                />
                                <Button
                                    label='Delete'
                                    size='small'
                                    onClick={() => handleDeleteMessage(messageId)}
                                    
                                />
                            </>
                        )}
                        <Button 
                            label='Reply'
                            size='small'
                            onClick={() => handleReplyMessage(messageId)}
                        />
                    </div>
                </div>
            )}

            <Modal 
                isOpen={isEditModalOpen}
                title='Edit Message'
                onClose={handleCloseModals}
                showCloseButton={false}
            >
                <EditMessage 
                    messageId={messageId}
                    onClose={handleCloseModals}
                />
            </Modal>
            <Modal
                isOpen={isDeleteModalOpen}
                title='Confirm Delete'
                onClose={() => setIsDeleteModalOpen(false)}
                showCloseButton={false}
            >
                <p>Are you sure you want to delete this message?</p>
                <Button
                    label='Delete'
                    size='small'
                    onClick={confirmDeleteMessage}
                    backgroundColor='bg-red-500'
                />
                <Button
                    label='Cancel'
                    size='small'
                    onClick={handleCloseModals}
                />
            </Modal>
            <Modal
                isOpen={isReplyModalOpen}
                title='Reply to Message'
                onClose={handleCloseModals}
                showCloseButton={false}
            >
                <ReplyMessageForm
                    messageId={messageId}
                    accountId={userId}
                    onClose={handleCloseModals}
                />
            </Modal>
        </div>
    );
}

export default MessageWithReplies;
