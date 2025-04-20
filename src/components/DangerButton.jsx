const DangerButton = ({ children, onClick }) => {
    return (
        <button
        className="bg-red-700 text-white font-semibold py-2 px-4"
        onClick={onClick}
        >
        {children}
        </button>
    );
    }
export default DangerButton;