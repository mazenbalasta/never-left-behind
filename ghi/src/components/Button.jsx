
const Button = ({
    label,
    iconURL,
    backgroundColor,
    textColor,
    borderColor,
    fullwitdh,
    size = 'normal',
    type = 'button'
}) => {

    const sizeClass = {
        small: 'px-4 py-2 text-sm',
        normal: 'px-7 py-4 text-lg',
        large: 'px-10 py-5 text-xl'
    };

    const iconSizeClass = {
        small: 'w-3 h-3',
        normal: 'w-5 h-5',
        large: 'w-7 h-7'
    };

    return (
        <button
            type={type}
            className={`flex justify-center items-center gap-2 px-7 py-4 border text-lg leading-none
            ${sizeClass[size]}
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
                    className={`ml-2 rounded-full bg-white ${iconSizeClass[size]}`}
                />
            )}
        </button>
    );
};

export default Button
