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


    return (
        <div className='relative w-full'>
            {/* container */}
            <div className='relative h-56 overflow-hidden rounded-xlg md:h-96'>
                {/* slides */}
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 h-full w-full bg-no-repeat bg-cover bg-center transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${img})` }} > 
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
