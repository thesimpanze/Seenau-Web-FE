import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
        <div className="container m-auto flex items-center justify-center flex-col">
            <h1>Hii, ur page was not found</h1>
            <Link to="/">
            <button className="bg-black text-white">Go back to home</button>
            </Link>
        </div>
        </>
    )
}
export default NotFound