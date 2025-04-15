const BigPrimaryButton = ({children, ... props}) =>{
    return(

        <button {...props} className="bg-black text-white font-semibold py-2 px-10 cursor-pointer">
        {children}
        </button>
)
}
export default BigPrimaryButton;