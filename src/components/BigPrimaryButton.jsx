const BigPrimaryButton = ({children, ... props}) =>{
    return(

        <button {...props} className={`bg-black outline-black text-white font-semibold py-2 px-10 cursor-pointer hover:outline-4 hover:outline-black hover:text-black hover:bg-white transition-all duration-500 ${props.className}`}>
        {children}
        </button>
)
}
export default BigPrimaryButton;