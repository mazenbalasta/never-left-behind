import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'

const Nav = () => {
    return (
        <header className="bg-gray-900">
            <nav className="flex justify-between items-center max-container">
                <a href='/'>
                    <img src={logo} alt="logo" width={130} height={29} />
                </a>
                <div>
                </div>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                        <li className='text-sm font-bold text-white uppercase'><a href="/">Home</a></li>
                        <li className='text-sm font-bold text-white uppercase'><a href="/resources">Resources</a></li>
                        <li className='text-sm font-bold text-white uppercase'>Messages</li>
                        <li className='text-sm font-bold text-white uppercase'>Events</li>
                        <li className='text-sm font-bold text-white uppercase'>Jobs</li>
                        <li className='text-sm font-bold text-white uppercase'><a href="/Activities">Activities</a></li>
                </ul>
                <div>
                    <button className=' max-lg:block bg-white text-black px-4 py-2 mr-5 rounded-full text-sm font-bold'>Log In</button>
                    <button className=' max-lg:block bg-white text-black px-4 py-2 rounded-full text-sm font-bold'>Sign Up</button>
                </div>
                <div className='hidden max-lg:block'>
                    <img src={hamburger} alt="hamburger" width={25} height={25} />
                </div>
            </nav>
        </header>
    )
}

export default Nav
