import { useState, useEffect } from 'react'
import { useLoginMutation } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { ErrorAlert } from '../assets/alerts'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [ login, loginStatus ] = useLoginMutation();
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
            <div className="App-header flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h1>
                </div>
                {errorMessage && (
                    <ErrorAlert alert="WARNING:  " message={errorMessage} />
                )}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Username:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-md sm:leading-8"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Password:
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-md sm:leading-8"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Not a member?{' '}
                        <a
                            href="/signup/veteran"
                            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                        >
                            Sign up to be a Veteran{' '}
                        </a>
                        or a{' '}
                        <a
                            href="/signup/partner"
                            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                        >
                            Partner
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
