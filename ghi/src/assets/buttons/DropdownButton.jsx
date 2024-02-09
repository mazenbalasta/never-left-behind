import { useState } from 'react'
import { Link } from 'react-router-dom'

const DropdownButton = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative inline-block">
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="flex items-center w-24 h-9 hover:bg-blue-800 bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
                type="button"
            >
                <span className="mr-1">{label}</span>
                <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="button-dropdown"
                    className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700"
                >
                    <ul className="py-2 text-md text-black-700 dark:text-black-200 font-normal">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    onClick={toggleDropdown}
                                    className="block px-4 py-1 hover:bg-blue-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropdownButton
