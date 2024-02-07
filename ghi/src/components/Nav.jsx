import { logo } from '../assets/images'
import { DropdownButton } from '../assets/buttons'
import { NavLink } from 'react-router-dom' // Added import statement
import { useGetTokenQuery } from '../app/apiSlice'
import {useLogoutMutation} from '../app/apiSlice'
import UserGreeting from '../functions/UserGreeeting'
import NLB_Banner from '../assets/images/NLB-Banner.png';

const Nav = () => {
    const { data:account } = useGetTokenQuery();
    const [logOut] = useLogoutMutation()
    // console.log({account})

    if (account) {
        const firstName = account.account.first_name;
    };

    return (
        <>
        <header className="bg-gray-900" style={{ backgroundImage: `url(${NLB_Banner})` }}>
            <nav className="flex items-left">
                <div className="flex items-left flex-col">
                    <a href="/">
                        <img src={logo} alt="logo" width={180} height={29} />
                    </a>
                </div>


            </nav>
        </header>
        <ul className="bg-gray-700 flex-1 flex justify-between items-center gap-16 max-lg:hidden">
                    <li className="nav-link ml-5 text-sm font-bold text-white uppercase hover:text-blue-500">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500">
                        <NavLink to="/resources">Resources</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500">
                        <NavLink to="/messages">Messages</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500">
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500">
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li className="nav-link text-sm font-bold text-white uppercase hover:text-blue-500">
                        Jobs
                    </li>
                    <li className="nav-link mr-2 text-sm font-bold text-white uppercase hover:text-blue-500">
                        Activities
                    </li>
                    <div className="login-signup-button flex pr-5 mr-5">
                    {!account && (
                        <button className=" w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold">
                            <NavLink to="/login">Log In</NavLink>
                        </button>
                    )}
                    {!account && (
                        <DropdownButton
                            label="Sign up"
                            items={[
                                { label: 'Veteran', link: '/signup/veteran' },
                                { label: 'Apply to be a Partner!', link: '/signup/partner' },
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

        </ul>
        <div className="bg-gray-900 Chat-text">
        {account && (
                        <UserGreeting firstName={account.account.first_name} />
                    )}
                    </div>

        </>
    )
}

export default Nav;
