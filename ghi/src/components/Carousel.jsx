import { useState, useEffect } from 'react'
import { aboutUs, activities, events, jobs, messages } from '../assets/images';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';


const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [aboutUs, activities, events, jobs, messages];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((preIndex => (preIndex + 1) % images.length))
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const descriptions = [
        "write about us",
        "write activities description",
        "write events description",
        "write jobs description",
        "write messages description"
    ];



    return (
        <div className='relative w-full items-center justify-center'>
            {/* container */}
            <div className='overflow-hidden w-full h-56 md:h-96 '>
                {/* slides */}
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute transition-opacity duration-700 ease-in-out' ${index === activeIndex ? 'opacity-100' : 'opacity-0'} w-full h-full bg-cover bg-center`}
                        style={{ backgroundImage: `url(${img})` }} > 

                        {/* text overlay */}
                        <div className='absolute bottom-0 left-0 p-4 md:p-6 bg-black bg-opacity-50 w-full text-white'>
                            <h2 className='text-xl md:text-2xl text-center font-bold '>{descriptions[index]}</h2>
                        </div>
                    </div>
                ))}
            </div>
            {/* navigation buttons */}
            <button 
                className='absolute top-1/2 left-0 transform -translate-y-1/2 p-2 md:p-3 bg-white bg-opacity-30'
                onClick={() => setActiveIndex(activeIndex => (activeIndex - 1 + images.length) % images.length)}
                >
                    <FaChevronCircleLeft />
            </button>
            <button
                className='absolute top-1/2 right-0 transform -translate-y-1/2 p-2 md:p-3 bg-white bg-opacity-30'
                onClick={() => setActiveIndex(activeIndex => (activeIndex + 1) % images.length)}
                >
                    <FaChevronCircleRight />
            </button>
        </div>
    );
};

export default Carousel
