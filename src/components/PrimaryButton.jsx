const PrimaryButton = ({ children, onClick }) => {
    return (
        <button
        className="bg-black text-white font-semibold py-2 px-4"
        onClick={onClick}
        >
        {children}
        </button>
    );
    }
export default PrimaryButton;