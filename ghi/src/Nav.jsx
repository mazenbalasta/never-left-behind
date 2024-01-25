import { logo } from './assets/images'
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav classname="bg-white border-gray-200 dark:bg-gray-900">


    <div classname="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <span classname="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Never Left Behind</span>
        </a>
        <a href="/">Home Page</a>
        <a href="/construct">Construct</a>
        <div classname="flex items-center space-x-3 rtl:space-x-reverse">
            <a href="#" classname="text-sm  text-gray-500 dark:text-white hover:underline">About</a>
            <a href="#" classname="text-sm  text-gray-500 dark:text-white hover:underline">Contact</a>
            <a href="#" classname="text-sm  text-gray-500 dark:text-white hover:underline">FAQ</a>
            <a href="tel:5541251234" classname="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
            <a href="#" classname="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
        </div>
    </div>
        </nav>
    )
}

export default Nav
