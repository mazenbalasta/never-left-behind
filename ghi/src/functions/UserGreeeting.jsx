import { useState, useEffect } from 'react'

export const UserGreeting = ({ firstName }) => {
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        const currentTime = new Date().getHours()

        if (currentTime < 12) {
            setGreeting('Good morning, ')
        } else if (currentTime < 18) {
            setGreeting('Good afternoon, ')
        } else {
            setGreeting('Good evening, ')
        }
    }, [])

    return (
            <h1 className='text-white bg-gray-700 px-6 pb-2'>
                {greeting}
                {firstName}!
            </h1>
    )
}

export default UserGreeting
