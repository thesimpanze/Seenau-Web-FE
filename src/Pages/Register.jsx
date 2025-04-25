import { Link, Navigate, useNavigate } from "react-router-dom";
import BigPrimaryButton from "../components/BigPrimaryButton";
import axios from "axios";
import { useState } from "react";


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleRegister = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          email,name,password
        }
      );
      navigate('/login')
      console.log('berhasil daftar', response.data)
    }
    catch(err){
      console.log('gagal daftar', err.message)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleRegister} className="px-9 py-5 rounded-sm outline-slate-500 outline-1 shadow-lg flex flex-col justify-center items-center gap-8">
        <div className="font-bold text-2xl text-center">
          <span className="bg-yellow-300 px-1">See</span>
          <span>nau</span>
          <h1 className="font-semibold text-2xl">Register</h1>
        </div>
        <div className="flex flex-col gap-4">
          <input type="email" size={30} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="text" size={30} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2.5  rounded-sm outline-1 outline-slate-500 bg-white" />
          <input type="password" size={30} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" />
          {/* <input type="number" size={30} placeholder="No. Hp" className="px-3 py-2.5 rounded-sm outline-1 outline-slate-500 bg-white" /> */}
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <BigPrimaryButton type="submit">Daftar</BigPrimaryButton>
        </div>
        <p className="text-sm">
          Already have account? <Link to="/login">
          <span className=" font-semibold">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
