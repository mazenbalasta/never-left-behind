import { useState, useEffect } from 'react'
import { 
    useGetAllMessagesQuery,
    useGetAllAccountsQuery,
    useIncrementMessageViewsMutation,
    useGetTokenQuery,
} from '../../app/apiSlice';
import { Button, Modal } from '..'
import { arrowRight } from '../../assets/icons'
import MessageWithReplies from './MessageWithReplies';
import CreateMessageForm from './CreateMessageForm';


function ListMessages() {
    const { data: messages, isLoading, isError, refetch } = useGetAllMessagesQuery();
    const { data: accounts } = useGetAllAccountsQuery();
    const { data: tokenData } = useGetTokenQuery();

    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [incrementMessageViews] = useIncrementMessageViewsMutation();

    const isAuthenticated = tokenData && tokenData.account;
    const userId = tokenData?.account?.id;

    
    const handleOpenSelectedMessageModal = async (messageId) => {
        try {
            await incrementMessageViews(messageId).unwrap();
            setSelectedMessageId(messageId);
        } catch (error) {
            console.error('Failed to increment message views', error);
        }
    };


    const handleSelectedMessageCloseModal = () => {
        setSelectedMessageId(null);
    }


    useEffect(() => {
        if (selectedMessageId === null) {
            refetch();
        }
    }, [selectedMessageId, refetch]);
    
    
    const handleCreateMessage = () => {
        setIsCreateModalOpen(true);
    };    


    const handleCloseCreateModal = (updated) => {
        setIsCreateModalOpen(false);
        if (updated) {
            refetch();
        }
    };
    



    const findUsernameById = (accountId) => {
        const account = accounts.find(account => account.id === accountId);
        return account ? account.username : 'Unknown User';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
    };


    if (isLoading) return <p>Loading messages...</p>;
    if (isError) return <p>Error loading messages.</p>;

    return (
        <main className="relative min-h-screen w-screen flex flex-col items-center">
            <div className='container p-4 text-white'>
                <div className="Chat-text text-center my-8 text-[calc(20px+2vmin)]">
                    <h1>Messages</h1>
                </div>
                {isAuthenticated && (
                    <div className='flex justify-center mt-20'>
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
                            showCloseButton={false}
                        >
                            <CreateMessageForm 
                                onClose={handleCloseCreateModal}
                                accountId={userId}
                            />
                        </Modal>
                    </div>
                )}
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-[60px]'>
                    {messages.map(message => (
                        <div key={message.id}
                            className='bg-white flex flex-col justify-center w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'
                        >
                            <div className='min-w-0 text-center'>
                                <h1 className='Chat-text text-3xl leading-5 font-medium text-black pt-2'>
                                    {message.title.length > 10 ? message.title.substring(0, 10) + '...' : message.title}
                                </h1>
                                <div className='mt-2 text-sm leading-5 text-[rgb(199,158,80)]'>
                                    {message.body.length > 50 ? message.body.substring(0, 30) + '...' : message.body}
                                </div>
                            </div>
                            <div className='mt-2 flex items-start text-sm leading-5 text-gray-700'>
                                <svg className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' fill='currentColor' viewBox="0 0 20 20">
                                    <path d='M2 5a2 2 0 011.85-2H16a2 2 0 012 2v8a2 2 0 01-2 2H3.85A1.85 1.85 0 012 13V5z'/>
                                </svg>
                                {message.views} views
                            </div>
                            <div className='mt-1 flex items-start text-sm leading-5 text-gray-700'>
                                <svg className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' fill='currentColor' viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM5.707 10.707a1 1 0 01-1.414-1.414L8.586 5.293a1 1 0 011.414 0l4.293 4.293a1 1 0 01-1.414 1.414L10 7.414l-4.293 4.293z" clipRule="evenodd" />
                                </svg>
                                {message.response_count} replies
                            </div>

                            <div className='mt-2 text-sm leading-5 text-gray-700'>
                                <strong>Posted by:</strong> {findUsernameById(message.account)}
                            </div>
                            <div className='mt-2 text-sm leading-5 text-gray-700'>
                                <strong>Posted on:</strong> {formatDate(message.date)}
                            </div>
                            <div className='self-center mt-8 mb-1'>
                                {isAuthenticated && (
                                    <Button
                                        label='Details'
                                        size='medium'
                                        onClick={() => handleOpenSelectedMessageModal(message.id)}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Modal
                    isOpen={Boolean(selectedMessageId)}
                    title='Message Details'
                    onClose={handleSelectedMessageCloseModal}
                >
                    {selectedMessageId && (
                        <MessageWithReplies
                            messageId={selectedMessageId}
                            onClose={handleSelectedMessageCloseModal}
                        />
                    )}
                </Modal>
            </div>
        </main>
    );
}

export default ListMessages;
