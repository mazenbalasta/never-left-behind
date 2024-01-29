import React, { useState, useEffect } from 'react';
function VeteranSignup () {

  const InitForm = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email:''
  };

  const [formData, setFormData] = useState({ ...InitForm });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPassVisibility = () => {
    setRepeatShowPassword(!showRepeatPassword);
  };

  const passwordMatchMessage = () => {
      if (repeatPassword && password !== repeatPassword) {
          return (
              <span
                  style={{
                      color: '#ff6666',
                      fontSize: '15px',
                      marginTop: '0px',
                  }}
              >
                  Passwords do not match
              </span>
          )
      } else if (repeatPassword === password && repeatPassword !== '') {
          return (
              <span
                style={{
                  color: 'green',
                  fontSize: '15px',
                  marginTop: '0px'
                }}
              >
                  Passwords match
              </span>
          )
      }
      return null
  }

  const handleInputChange = (e) => {
    const inputName = e.target.name
    const value = e.target.value

    if (inputName === 'password') {
      setPassword(value);
    } else if (inputName === 'repeatPassword') {
      setRepeatPassword(value)
    };

    setFormData({
      account_type: 'veteran',
      ...formData,
      [inputName]: value,
    })
  };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const confirmSubmit = window.confirm(
            'Are you sure you want to create this account?'
        )

        if (confirmSubmit) {
            const url = `http://localhost:8000/api/accounts/veterans`
            console.log(formData)
            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                setFormData({ ...InitForm })
                window.alert('Account created!')
            } else {
                window.alert('Account creation failed!')
            }
        } else {
            window.alert('Creation cancelled')
            setFormData({ ...InitForm })
        }
    }

  return (
      <>
          <h1>SIGNUP TO BE A F**KING VETERAN</h1>
          <div>
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                  <div className="mb-5">
                      <label
                          htmlFor="first-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          First name
                      </label>
                      <input
                          type="first-name"
                          name="first_name"
                          id="first-name"
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                      />
                  </div>
                  <div className="mb-5">
                      <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          Last name
                      </label>
                      <input
                          type="last-name"
                          name="last_name"
                          id="last-name"
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                      />
                  </div>
                  <div className="mb-5">
                      <label
                          htmlFor="username"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          Username
                      </label>
                      <input
                          type="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                      />
                  </div>
                  <div className="mb-5">
                      <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          Enter password
                      </label>
                      <div className="relative">
                          <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              id="password"
                              autoComplete="new-password"
                              onChange={handleInputChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                              required
                          />
                          <button
                              type="button"
                              className="absolute top-1/2 transform -translate-y-1/2 right-3 focus:outline-none"
                              onClick={togglePassVisibility}
                          >
                              {showPassword ? '🫣' : '👀'}
                          </button>
                      </div>
                  </div>
                  <div className="mb-5">
                      <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          Repeat password
                      </label>
                      <div className="relative">
                          <input
                              type={showRepeatPassword ? 'text' : 'password'}
                              id="repeat-password"
                              autoComplete="new-password"
                              name="repeatPassword"
                              onChange={handleInputChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                              required
                              pattern={password}
                          />
                          <button
                              type="button"
                              className="absolute top-1/2 transform -translate-y-1/2 right-3 focus:outline-none"
                              onClick={toggleRepeatPassVisibility}
                          >
                              {showRepeatPassword ? '🫣' : '👀'}
                          </button>
                      </div>
                  </div>
                  {passwordMatchMessage()}
                  <div className="mb-5">
                      <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                          Email
                      </label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                      />
                  </div>
                  <div className="flex items-start mb-5">
                      <div className="flex items-center h-5">
                          <input
                              id="terms"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                              required
                          />
                      </div>
                      <label
                          htmlFor="terms"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                          I agree with the{' '}
                          <a
                              href="#"
                              className="text-blue-600 hover:underline dark:text-blue-500"
                          >
                              terms and conditions
                          </a>
                      </label>
                  </div>
                  <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                      Register new account
                  </button>
              </form>
          </div>
      </>
  )
};

export default VeteranSignup;
