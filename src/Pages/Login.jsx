import { Link, Navigate, useNavigate } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";
import { useEffect, useState } from "react";
import { login } from "../services/API";
import Particles from "../components/Particles";
import UseAuthCheck from "../services/UseAuthCheck";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"))
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await login(email, password);
      console.log("berhasil masuk", res.message);
      setIsCorrect("Berhasil Masuk");
      UseAuthCheck()
      navigate("/");
      localStorage.setItem("token", JSON.stringify(res.data.user));
    } catch (err) {
      console.log(err);
      setIsCorrect(err.response?.data?.message || err.message);
    }
  };
  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-white md:px-0 px-6">
      <div className="fixed top-0 left-0 w-full h-full ">
        <Particles particleColors={["#000000", "#000000"]} particleCount={400} particleSpread={8} speed={0.1} particleBaseSize={100} moveParticlesOnHover={true} alphaParticles={false} disableRotation={false} />
      </div>
      <form onSubmit={handleLogin} className="md:px-9 px-5 py-5  rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center md:gap-8 gap-5 z-50 bg-white hover:scale-105 transition-all duration-300 ">
        <div className="font-bold text-2xl text-center">
          <Link to={"/"}>
            <span className="bg-yellow-300 px-1">See</span>
            <span>nau</span>
          </Link>
          <h1 className="font-semibold text-2xl">Login</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-4">
            <input type="email" size={30} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
            <input type="password" size={30} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
          </div>
          <p className={`text-red-500 text-sm ${isCorrect ? "block" : "hidden"}`}>*{isCorrect}</p>
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <BigPrimaryButton type="submit">Let me in</BigPrimaryButton>
          <Link className="text-right" to="/">
            <span className="text-sm text-right">Back to home</span>
          </Link>
        </div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-black font-semibold">Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
