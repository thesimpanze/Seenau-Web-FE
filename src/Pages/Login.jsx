import { Link, Navigate, useNavigate } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";
import { useEffect, useState } from "react";
import { login } from "../services/API";
import UseAuthCheck from "../services/UseAuthCheck";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState("");
  const navigate = useNavigate();
  const isAuth = UseAuthCheck();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await login(email, password);
      console.log("berhasil masuk", res.message);
      setIsCorrect("Berhasil Masuk");
      navigate("/");
      // setTimeout(()=>{
      // }, 1000)
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setIsCorrect(err.response?.data?.message || err.message);
    }
  };
  if (isAuth.isAuth) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="px-9 py-5 rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center gap-8">
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
