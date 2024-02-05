import { useState } from "react"
import { useGetTokenQuery, useCreateResponseMutation } from "../../app/apiSlice"
import { Button } from ".."


function ReplyMessageForm( { messageId, onClose }) {
    const { data: tokenData } = useGetTokenQuery();
    const [responseBody, setResponseBody] = useState('');
    const [createResponse, { isLoading, isError }] = useCreateResponseMutation();


    const handleChange = (event) => {
        setResponseBody(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accountId = parseInt(tokenData.account.id, 10);
            if (isNaN(accountId)) {
                console.error('Invalid account id:', tokenData.account.id);
                return;
            }

            const messageId = parseInt(messageId, 10);
            if (isNaN(messageId)) {
                console.error('Invalid message id:', messageId);
                return;
            }

            const formData = {
                body: responseBody,
                account: accountId,
            };

            await createResponse({ message_id: messageId, ...formData }).unwrap();
            onClose(true);
        } catch (error) {
            console.error('Failed to create reply:', error)
            onClose(false);
        };
    };


    if (isLoading) return <p>Responding...</p>
    if (isError) return <p>Error creating the response</p>

    return (
        <div className='max-w-md mx-auto mt-10'>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h1 className='text-xl font-bold mb-5'>Create Reply</h1>
                <form onSubmit={handleSubmit} id='reply-message-form'>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='body'>Response</label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={responseBody}
                            onChange={handleChange}
                            placeholder='Type your response...'
                            required name='body'
                            id='body'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button
                            type='submit'
                            label='Send'
                            size='small' 
                            backgroundColor='bg-blue-500'
                        />
                        <Button
                            type='button'
                            label='Cancel'
                            size='small'
                            onClick={onClose}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReplyMessageForm
