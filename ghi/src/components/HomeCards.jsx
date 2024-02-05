import { Button } from "../components"
import { arrowRight } from "../assets/icons"

const HomeCardsWrapper = ({ cards }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {cards.map((card, index) => (
                <HomeCards key={index} imgURL={card.imgURL} label={card.label} subtext={card.subtext} />
            ))}
        </div>
    )
}

const HomeCards = ({ imgURL, label, subtext }) => {
    const IconComponent = imgURL;
  return (
    <div className='flex flex-col items-center w-full rounded-[20px] shadow-3xl px-6 py-8 border sm:px-10 sm:py-16'>
        <div className='w-11 h-11 flex justify-center items-center bg-gray-900 rounded-full'>
            <IconComponent size={24} color="white" />
        </div>
        <h3 className='mt-5 text-xl sm:text-3xl leading-normal font-bold text-center'>
            {label}
        </h3>
        <p className='mt-3 break-words text-base sm:text-lg leading-normal text-center'>
            {subtext}
        </p>
        <div className='mt-6 sm:mt-11 flex flex-wrap gap-4 justify-center'>
        <Button type='submit' label='Learn more' iconURL={arrowRight} />
        </div>
    </div>
  );
};

export default HomeCards
