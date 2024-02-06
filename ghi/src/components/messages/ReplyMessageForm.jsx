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
            <div className='bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'>
                <form onSubmit={handleSubmit} id='reply-message-form'>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-xl font-bold mb-2' htmlFor='body'>Response</label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-[rgb(199,158,80)] leading-tight focus:outline-none focus:shadow-outline'
                            value={responseBody}
                            onChange={handleChange}
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


// import { useState, useEffect } from 'react'
// import { Button } from '..'
// import { useGetTokenQuery, useGetMessageWithResponsesQuery, useCreateResponseMutation } from '../../app/apiSlice'

// function MessageWithReplies({ messageId, onClose }) {
//     const { data: tokenData } = useGetTokenQuery();
//     const { data: messageData, isLoading, isError, error } = useGetMessageWithResponsesQuery(messageId);
//     const [createResponse, { isLoading: isSuccess }] = useCreateResponseMutation();
//     const [responseBody, setResponseBody] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (event) => {   
//         setResponseBody(event.target.value);
//     };

//     useEffect(() => {
//         if (messageData) {
//             console.log(messageData)
//         }
//         if (isError) {
//             setErrorMessage(error?.data?.message || 'Error loading message')
//         }
//         if (isSuccess) {
//             console.log('Response created successfully')
//             setResponse('');
//         }

//     }, [messageData, isError, error, isSuccess])

//     // const handleSubmit = async () => {
//     //     if (response.trim() === '') {
//     //         setErrorMessage('Response cannot be empty');
//     //         return;
//     //     }
//     //     try {
//     //         await createResponse({ messageId, reply: response });
//     //     } catch (error) {
//     //         setErrorMessage('Error submitting response');
//     //     }
//     // }
//         const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const accountId = parseInt(tokenData.account.id, 10);
//             if (isNaN(accountId)) {
//                 console.error('Invalid account id:', tokenData.account.id);
//                 return;
//             }

//             const messageId = parseInt(messageId, 10);
//             if (isNaN(messageId)) {
//                 console.error('Invalid message id:', messageId);
//                 return;
//             }

//             const formData = {
//                 body: responseBody,
//                 account: accountId,
//             };

//             await createResponse({ message_id: messageId, ...formData }).unwrap();
//             onClose(true);
//         } catch (error) {
//             console.error('Failed to create reply:', error)
//             onClose(false);
//         };
//     };


//     if (isLoading) return <div>Loading...</div>
//     if (errorMessage) return <div>{errorMessage}</div>

//     return (
//         <div className='max-w-md mx-auto mt-10'>
//             <div className='bg-white flex flex-col w-full rounded-[20px] shadow-3xl px-6 py-8 border-4 border-[rgb(199,158,80)] sm:px-10 sm:py-16'>
//                 <form onSubmit={handleSubmit} id='reply-message-form'>
//                     <div className='mb-6'>
//                         <label className='block text-gray-700 text-xl font-bold mb-2' htmlFor='body'>Response</label>
//                         <textarea
//                             className='shadow appearance-none border rounded w-full py-2 px-3 text-[rgb(199,158,80)] leading-tight focus:outline-none focus:shadow-outline'
//                             value={responseBody}
//                             onChange={handleChange}
//                             required name='body'
//                             id='body'
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <Button
//                             type='submit'
//                             label='Send'
//                             size='small' 
//                             backgroundColor='bg-blue-500'
//                         />
//                         <Button
//                             type='button'
//                             label='Cancel'
//                             size='small'
//                             onClick={onClose}
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }


// export default MessageWithReplies
