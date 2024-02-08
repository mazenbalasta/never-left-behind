import { Button } from "../components"
import { arrowRight } from "../assets/icons"

const HomeCards = ({ imgURL, label, subtext }) => {
    const IconComponent = imgURL;
  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 border'>
        <div className='w-11 h-11 flex justify-center items-center bg-gray-900 rounded-full'>
            <IconComponent size={24} color="white" />
        </div>
        <h3 className='mt-5 text-3xl leading-normal font-bold'>
            {label}
        </h3>
        <p className='mt-3 break-words text-lg leading-normal'>
            {subtext}
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
        <Button type='submit' label='Learn more' iconURL={arrowRight} />
        </div>
    </div>
  );
};

export default HomeCards
