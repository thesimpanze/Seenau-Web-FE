const SecondaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick}
        className="outline-2 outline-black text-black font-semibold py-1.5 px-3 cursor-pointer"
        >
        {children}
        </button>
    );
}
export default SecondaryButton;