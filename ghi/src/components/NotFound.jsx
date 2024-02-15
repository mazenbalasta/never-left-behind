import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="App-header bg-camouflage min-h-screen flex flex-col items-center justify-center text-white font-military">
            <h2 className="text-4xl font-semibold mb-4">404 - Not Found</h2>
            <p className="text-lg mb-4">
                Sorry, the page you are looking for does not exist.
            </p>
            <p className="text-sm mb-8">
                Return to{' '}
                <Link to="/" className="text-blue-500">
                    home
                </Link>
                .
            </p>
            {/* Military-themed SVG illustration (replace with your actual SVG) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 text-gray-300"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
            {/* You can customize and add more content or styling here */}
        </div>
    )
}

export default NotFound
