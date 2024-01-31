import { useState } from 'react'
// import { useLoginMutation } from '../app/apiSlice'
import useAuthContext from '@galvanize-inc/jwtdown-for-react'
import useToken from '@galvanize-inc/jwtdown-for-react'


const Login = () => {
  const { token } = useAuthContext()



  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useToken()

  const handleSubmit = (e) => {
      e.preventDefault()
      login(username, password)
      e.target.reset()
  }




    return (
        <>
            {token && <h1>YOU'RE LOGGED IN DUMMY!</h1>}
            <div className="card text-bg-light mb-3">
                <h5 className="card-header">Login</h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="text-color black">
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
