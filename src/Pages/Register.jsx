import { Link, Navigate, useNavigate } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";
import axios from "axios";
import { useState } from "react";
import { register } from "../services/API";
import UseAuthCheck from "../services/UseAuthCheck";
import Particles from "../components/Particles";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState("");
  const navigate = useNavigate();
  const isAuth = UseAuthCheck();
  if (isAuth.isAuth) {
    return <Navigate to="/" replace={true} />;
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let res = await register(email, name, password);

      setIsCorrect("berhasil daftar");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log("berhasil daftar", res.message);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setIsCorrect(err.response?.data?.message || err.message);
      if (err.response?.status === 500) {
        console.log("email sudah terdaftar");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen md:px-0 px-6">
      <div className="fixed top-0 left-0 w-full h-full ">
        <Particles particleColors={["#000000", "#000000"]} particleCount={400} particleSpread={10} speed={0.1} particleBaseSize={100} moveParticlesOnHover={true} alphaParticles={false} disableRotation={false} />
      </div>
      <form onSubmit={handleRegister} className="md:px-9 px-5 py-5 rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center md:gap-8 gap-5 z-50 bg-white">
        <div className="font-bold text-2xl text-center">
          <Link to={"/"}>
            <span className="bg-yellow-300 px-1">See</span>
            <span>nau</span>
          </Link>
          <h1 className="font-semibold text-2xl">Register</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-4">
            <input type="email" size={30} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Pastikan Email Aktif" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
            <input type="text" size={30} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
            <input type="password" size={30} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
            {/* <input type="number" size={30} placeholder="No. Hp" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" /> */}
          </div>
          <span className={`text-red-500 text-sm  ${isCorrect ? "block" : "hidden"}`}>{isCorrect}</span>
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <BigPrimaryButton type="submit">Register me</BigPrimaryButton>
        </div>
        <p className="text-sm">
          Already have account?{" "}
          <Link to="/login">
            <span className=" font-semibold">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
