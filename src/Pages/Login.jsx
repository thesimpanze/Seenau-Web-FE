import { Link, Navigate, useNavigate } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isCorret = true;
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("berhasil masuk", response.data);
      navigate("/");
      isCorret = true;
    } catch (err) {
      console.log(err.response.data);
      isCorret = false;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="px-9 py-5 rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center gap-8">
        <div className="font-bold text-2xl text-center">
          <span className="bg-yellow-300 px-1">See</span>
          <span>nau</span>
          <h1 className="font-semibold text-2xl">Login</h1>
        </div>
        <div className="flex flex-col gap-4">
          <input type="text" size={30} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="password" size={30} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <BigPrimaryButton type="submit">Login</BigPrimaryButton>
          <Link className="text-right" to="/forgot-password">
            <span className="text-sm text-right">Forget Password?</span>
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
