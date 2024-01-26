import { logo } from '../assets/images'
import { hamburger } from '../assets/icons'

const Nav = () => {
    return (
        <header className="bg-gray-900">
            <nav className="flex justify-between px-8 py-8">
                <a href='/'>
                    <img src={logo} alt="logo" width={130} height={29} />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                        <li className='text-sm font-bold text-white uppercase'>Home</li>
                        <li className='text-sm font-bold text-white uppercase'>Resources</li>
                        <li className='text-sm font-bold text-white uppercase'>Messages</li>
                        <li className='text-sm font-bold text-white uppercase'>Events</li>
                        <li className='text-sm font-bold text-white uppercase'>Jobs</li>
                        <li className='text-sm font-bold text-white uppercase'>Activities</li>
                </ul>
                <div className='hidden max-lg:block'>
                    <img src={hamburger} alt="hamburger" width={25} height={25} />
                </div>
            </nav>
        </header>
    )
}

export default Nav
