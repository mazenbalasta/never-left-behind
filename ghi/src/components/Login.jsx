import { useState, useEffect } from 'react'
import { useLoginMutation, useGetTokenQuery } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { ErrorAlert } from '../assets/alerts'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [ login, loginStatus ] = useLoginMutation();
    const { data: account } = useGetTokenQuery()
    const navigate = useNavigate()


    useEffect (() => {
        if (loginStatus.isSuccess) navigate('/');
        if (loginStatus.isError) {
            setErrorMessage(loginStatus.error.data.detail)
        }
    }, [loginStatus])


    const handleSubmit = (e) => {
        e.preventDefault()
        login({ username, password });
    }


    return (
        <>
            <div className='App-header'>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header">Login</h5>
                    {errorMessage && (
                        <ErrorAlert alert="WARNING:  " message={errorMessage} />
                    )}
                    <div className="card-body">
                        <form
                            onSubmit={handleSubmit}
                            className="text-color black"
                        >
                            <div className="mb-3">
                                <label className="form-label">Username: </label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    style={{ color: 'black' }}
                                    value={username}
                                    required
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password: </label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    style={{ color: 'black' }}
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <button
                                    className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-black rounded-full"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
