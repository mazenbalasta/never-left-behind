// import useToken from '@galvanize-inc/jwtdown-for-react'
import { useState } from 'react'
import { useLoginMutation } from '../app/apiSlice'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const { login } = useToken()

    const [login] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('login')
        console.log({ username, password })
        login({ username, password })
    }

    const getTokenAgain = async () => {
        const url = `http://localhost:8000/token`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <div>
                <button className="w-30 h-10 hover:bg-blue-800 bg-red text-black px-4 py-2 mr-5 rounded-full text-sm font-bold" onClick={getTokenAgain}>Get Token Again</button>
            </div>

        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                <form
                    onSubmit={handleSubmit}
                    className="text-color black"
                >
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
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
                        <label className="form-label">Password:</label>
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
