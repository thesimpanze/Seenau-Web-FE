const SecondaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick}
        className="outline-2 outline-black text-black font-semibold py-2 px-3"
        >
        {children}
        </button>
    );
}
export default SecondaryButton;