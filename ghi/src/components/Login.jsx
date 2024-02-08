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
            {account && <h1>YOU'RE LOGGED IN DUMMY!</h1>}
            {!account && <h1>YOU'RE LOGGED OUT!!</h1>}
            <div className="card text-bg-light mb-3">
                <h5 className="card-header">Login</h5>
                {errorMessage && <ErrorAlert alert="WARNING:  " message={errorMessage} />}
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="text-color black">
                        <div className="mb-3">
                            <label className="form-label">Username: </label>
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                style={{ color: 'black' }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password: </label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                style={{ color: 'black' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
