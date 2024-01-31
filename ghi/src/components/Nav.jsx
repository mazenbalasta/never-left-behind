import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { DropdownButton } from '../assets/buttons'
import { Link } from 'react-router-dom'

const Nav = () => {

    return (
        <header className="bg-gray-900">
            <nav className="flex justify-between items-center max-container">
                <a href="/">
                    <img src={logo} alt="logo" width={130} height={29} />
                </a>
                <div></div>
                <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
                    <li className="text-sm font-bold text-white uppercase">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-sm font-bold text-white uppercase">
                        <Link to="/resources">Resources</Link>
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
                        <Link to="/activitiesForm">Activities Form
                        </Link></li>
                    <li className="text-sm font-bold text-white uppercase">
                        <Link to="/activities">Activities</Link>
                    </li>
                </ul>
                <div className="login-signup-button">
                    <button className="w-30 h-10 hover:bg-blue-800 bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold">
                        Log In
                    </button>
                    <DropdownButton
                        label="Sign up"
                        items={[
                            { label: "Veteran", link: "/signup/veteran" },
                            { label: "Partner", link: "/signup/partner" }
                        ]}
                    />
                </div>
            </nav>
        </header>
    )
}

export default Nav
