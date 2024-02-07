import { useState } from 'react'
import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { DropdownButton } from '../assets/buttons'
import { NavLink } from 'react-router-dom' // Added import statement
import { useGetTokenQuery, useLogoutMutation } from '../app/apiSlice'
import UserGreeting from '../functions/UserGreeeting'
import NLB_Banner from '../assets/images/NLB-Banner.png';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: account } = useGetTokenQuery();
    const [logOut] = useLogoutMutation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    return (
        <>
        <header className="bg-gray-900" style={{ backgroundImage: `url(${NLB_Banner})` }}>
            <nav className="flex justify-between items-center w-full px-4 lg:px-4">
                <div className="flex items-center flex-shrink-0">
                    <a href="/">
                        <img src={logo} alt="logo" width={180} height={29} />
                    </a>
                </div>
                <div className='flex justify-center items-center flex-grow'>
                    <div className='md:hidden' onClick={toggleMenu}>
                        <img src={hamburger} alt="Menu" width={25} height={25} />
                    </div>
                </div>
            </nav>
        </header>
                <ul className={`grid grid-cols-7 gap-6 content-center bg-gray-700 ${isMenuOpen ? 'flex flex-col items-center' : 'hidden'} md:flex md:flex-row md:justify-between items-center text-2xl py-6 px-16`}>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        <NavLink to="/resources">Resources</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        <NavLink to="/messages">Messages</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500" onClick={closeMenu}>
                        Jobs
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/activitiesForm">Activities Form
                        </NavLink></li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/activities">Activities</NavLink>
                    </li>
                </ul>
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
                            onClick={() => { logOut(); closeMenu() }}
                            className="w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold"
                        >
                            Logout
                        </button>
                    )}
                </div>

        </ul>
        <div className="bg-gray-900 Chat-text">
        {account && (
                        <UserGreeting firstName={account.account.first_name} />
                    )}
                    </div>

        </>
    )
}

export default Nav
