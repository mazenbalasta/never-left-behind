import { useState } from 'react'
import { aboutUs, activities, events, jobs, messages } from 'assets/images';


const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [aboutUs, activities, events, jobs, messages];

    const descriptions = [
        "write about us",
        "write activities description",
        "write events description",
        "write jobs description",
        "write messages description"
    ];

    const goToSlide = index => {
        setActiveIndex(index);
    };

    const goToNextSlide = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };


  return (
    <div>Carousel</div>
  )
}

export default Carousel

