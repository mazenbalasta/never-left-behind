import { aboutUs, mentor } from '../assets/images';
import { Link } from 'react-router-dom'


function MembershipBenefits() {
return (
    <div className="w-screen px-20 py-20 text-white">
        <div>
            <h1 className="Chat-text text-start text-5xl font-bold uppercase mb-2">Join Our Community</h1>
            <p className="text-lg text-start">Become a member and enjoy a range of exclusive benefits.</p>
        </div>

        <div className='flex justify-center items-start w-screen my-20 flex-wrap gap-[20rem]'>

            {/* veteran column */}
            <div className="px-4 py-20 max-w-xl">
                <img
                    src={aboutUs}
                    alt="About Us"
                    className="w-full h-auto max-w-lg rounded-lg"
                />
                <h2 className="Chat-text text-4xl font-bold mb-4">Veteran Membership Benefits</h2>
                <p className="text-xl mb-2">Join our community and enjoy a range of exclusive benefits:</p>
                <ul className="list-inside list-disc w-[25rem] text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>Annual Swag</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Member of the Month</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Access to Activities and Events</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Job Opportunities</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Member Directory</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>Mentorship Programs</li>
                </ul>
                <Link to="/signup/veteran" className="mt-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Veteran signup
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>


            {/* partner column */}
            <div className='px-4 py-20 max-w-xl'>
                <img
                    src={mentor}
                    alt="Mentor"
                    className=" h-[21.5rem] max-w-xl rounded-lg"
                />
                <h2 className="Chat-text text-4xl font-bold my-4">Partnership Opportunities</h2>
                <p className="text-xl mb-2">Engage with our community through various partnership opportunities:</p>
                <ul className="list-inside list-disc w-[25rem] text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>Event Sponsorship</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>Boost brand awareness</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Creating Job Opportunities</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Providing Mentorship</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'>Activity Hosting</li>
                    <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>And more!</li>
                </ul>
                <Link to="/signup/partner" className="mt-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Partner application
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    </div>
    );
}

export default MembershipBenefits;
