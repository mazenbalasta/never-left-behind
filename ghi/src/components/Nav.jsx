import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { DropdownButton } from '../assets/buttons'
import { NavLink } from 'react-router-dom'
import { useGetTokenQuery } from '../app/apiSlice'




const Nav = () => {
    const { data:account, isLoading } = useGetTokenQuery();
    console.log({ account, isLoading })


    return (
        <header className="bg-gray-900">
            <nav className="flex justify-between items-center max-container">
                <a href="/">
                    <img src={logo} alt="logo" width={130} height={29} />
                </a>
                <div></div>
                <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <NavLink to="/resources">Resources</NavLink>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Messages
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Events
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Jobs
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        Activities
                    </li>
                </ul>
                <div className="login-signup-button">
                    <button className="w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold">
                        <NavLink to="/login">Log In</NavLink>
                    </button>
                    <DropdownButton
                        label="Sign up"
                        items={[
                            { label: 'Veteran', link: '/signup/veteran' },
                            { label: 'Partner', link: '/signup/partner' },
                        ]}
                    />
                </div>
            </nav>
        </header>
    )
}

export default Nav
