import { useState } from "react"
import { useGetTokenQuery, useCreateResponseMutation } from "../../app/apiSlice"
import { Button } from ".."


function ReplyMessageForm({ messageId, onClose }) {
    const { data: tokenData } = useGetTokenQuery();
    const [responseBody, setResponseBody] = useState('');
    const [createResponse, { isLoading, isError }] = useCreateResponseMutation();


    const accountId = tokenData?.account?.id;

    const handleChange = (event) => {
        setResponseBody(event.target.value);
    };

    const handleSubmit = async (event) => {
        try {
            await createResponse({messageId, account: parseInt(accountId, 10), body: responseBody }).unwrap();
            setResponseBody('');
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
            <div className='bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'>
                <form onSubmit={handleSubmit} id='reply-message-form'>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-xl font-bold mb-2' htmlFor='body'>Response</label>
                        <textarea
                            id='body'
                            name='body'
                            required
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-[rgb(199,158,80)] leading-tight focus:outline-none focus:shadow-outline'
                            value={responseBody}
                            onChange={handleChange}
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
                            onClick={() => onClose(false)}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReplyMessageForm
