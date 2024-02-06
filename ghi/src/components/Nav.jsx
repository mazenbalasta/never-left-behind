import { useState } from 'react'
import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { DropdownButton } from '../assets/buttons'
import { NavLink } from 'react-router-dom' // Added import statement
import { useGetTokenQuery, useLogoutMutation } from '../app/apiSlice'
import UserGreeting from '../functions/UserGreeeting'


const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: account } = useGetTokenQuery();
    const [logOut] = useLogoutMutation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className="bg-gray-900 p-8">
            <nav className="flex justify-between items-center max-container">
                <div className="flex items-center flex-col">
                    <a href="/">
                        <img src={logo} alt="logo" width={130} height={29} />
                    </a>
                    {account && (
                        <UserGreeting firstName={account.account.first_name} />
                    )}
                </div>
                <div className='flex justify-end items-center'>
                <div className='md:hidden' onClick={toggleMenu}>
                    <img src={hamburger} alt="Menu" width={25} height={25} />
                </div>
                <ul className={`flex-1 flex-col md:flex-row justify-center items-center gap-16 p-6 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/resources">Resources</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/messages">Messages</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Jobs
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Activities
                    </li>
                </ul>
                </div>
                <div className="login-signup-button">
                    {!account && (
                        <button className="w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold">
                            <NavLink to="/login">Log In</NavLink>
                        </button>
                    )}
                    {!account && (
                        <DropdownButton
                            label="Sign up"
                            items={[
                                { label: 'Veteran', link: '/signup/veteran' },
                                { label: 'Partner', link: '/signup/partner' },
                            ]}
                        />
                    )}
                    {account && (
                        <button
                            onClick={() => logOut()}
                            className="w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Nav
