import { Link } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="px-9 py-5 rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center gap-8">
        <div className="font-bold text-2xl text-center">
          <span className="bg-yellow-300 px-1">See</span>
          <span>nau</span>
          <h1 className="font-semibold text-2xl">Register</h1>
        </div>
        <div className="flex flex-col gap-4">
          <input type="text" size={30} placeholder="Nama" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="email" size={30} placeholder="Email" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="password" size={30} placeholder="Password" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="number" size={30} placeholder="No. Hp" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <BigPrimaryButton>Daftar</BigPrimaryButton>
        </div>
        <p className="text-sm">
          Already have account? <Link to="/login">
          <span className=" font-semibold">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
