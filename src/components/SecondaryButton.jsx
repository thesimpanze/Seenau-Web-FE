const SecondaryButton = ({onClick, children, ...props}) => {
    return (
        <button onClick={props.onClick}
        className="outline-2 outline-black text-black font-semibold py-1.5 px-3 cursor-pointer" disabled={props.disabled}
        >
        {children}
        </button>
    );
}
export default SecondaryButton;