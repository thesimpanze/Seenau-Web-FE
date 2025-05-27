import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const AuthModal = () => {
  return (
    <div className="fixed w-screen h-screen top-0 flex justify-center items-center z-50 backdrop-blur-md md:bg-black/10 bg-black/30 px-10 text-sm md:px-0 md:text-base">
      <div className="bg-white p-5">
        <h1 className="font-semibold text-lg">Oupss caught on 4k <span className="text-2xl">📸</span>, you are not authorized to access this page.</h1>
        <p className="text-center text-base mt-4">Please login to continue</p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Link to={"/login"}>
            <PrimaryButton>Yes, i'll be Login</PrimaryButton>
          </Link>
          <Link to={"/"}>
            <SecondaryButton>Back to home</SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
