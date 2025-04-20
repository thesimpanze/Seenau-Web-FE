import { Link } from "react-router-dom"
import BigPrimaryButton from "../components/BigPrimaryButton"

const NotFound = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center min-h-screen ">
        
            <h1 className="font-semibold">Hii, ur page was not found</h1>
            <Link to="/">
            <BigPrimaryButton >Go back to home</BigPrimaryButton>
            </Link>
        
        </div>
    )
}
export default NotFound