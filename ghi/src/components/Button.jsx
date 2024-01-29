
const Buttom = ({
    label,
    iconURL,
    backgroundColor,
    textColor,
    borderColor,
    fullwitdh
}) => {

    return (
        <button
            className={`flex justify-center items-center gap-2 px-7 py-4 border text-lg leading-none
            ${
                backgroundColor
                ? `${backgroundColor} ${textColor} ${borderColor}`
                : "bg-gray-900 text-white border-white"
            } rounded-full ${fullwitdh && "w-full"}`}
        >
            {label}
            
            {iconURL && (
                <img 
                    src={iconURL} 
                    alt='arrow right icon'
                    className='ml-2 rounded-full bg-white w-5 h-5'
                />
            )}
        </button>
    );
};

export default Buttom
