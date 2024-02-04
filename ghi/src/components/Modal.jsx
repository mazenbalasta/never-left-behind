import Button from "./Button";

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-gray-400 p-4 rounded-lg shadow-lg max-w-lg w-full ">
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

                {children}

                <Button 
                    label="Close"
                    size="medium"
                    onClick={onClose}
                    backgroundColor="bg-red-500"
                    textColor="text-white"
                    borderColor="border-red-500"
                    
                />
            </div>
        </div>
    );
};

export default Modal;
