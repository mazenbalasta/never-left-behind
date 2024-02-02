import { useNavigate } from 'react-router-dom';
import { useCreateMessageMutation } from '../../app/apiSlice'
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'
import { useState } from 'react';
import { useGetTokenQuery } from '../../app/apiSlice';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useEffect } from 'react';


function MessageForm() {
    const { token } = useAuthContext()
    // const { token: token } = useGetTokenQuery()
    useEffect(() => {
        console.log('Token:', token)
    }, [token])




    const [message, setMessage] = useState({
        title: '',
        body: '',
    })

    const [createMessage] = useCreateMessageMutation()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setMessage((prevMessage) => ({ ...prevMessage, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createMessage(message).unwrap()
            navigate('/messages')
        } catch (error) {
            console.error('Error submitting form', error)
        }
    }

    const navToMessageList = () => {
        navigate('/messages')
    }

    return (
        <>
            <div className="form-contain mb-20">
                <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-xl color-white font-bold mb-5">
                        Create a Message
                    </h1>
                    <form onSubmit={handleSubmit} id="create-message-form">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={message.title}
                                onChange={handleChange}
                                placeholder="Enter a title"
                                required
                                type="text"
                                name="title"
                                id="title"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text- text-sm font-bold mb-2"
                                htmlFor="body"
                            >
                                Message Body
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={message.body}
                                onChange={handleChange}
                                placeholder="Message body..."
                                required
                                name="body"
                                id="body"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                type="submit"
                                label="Create Message"
                                size="medium"
                                imageURL={arrowRight}
                            />
                            <Button
                                type="button"
                                label="Cancel"
                                size="medium"
                                imageURL={arrowRight}
                                onClick={navToMessageList}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default MessageForm;
