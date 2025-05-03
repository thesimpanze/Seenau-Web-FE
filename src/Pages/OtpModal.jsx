import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import DangerButton from "../components/DangerButton";
import { generateOTP, sendOTP } from "../services/API";
import { FiArrowLeft } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";



const OtpModal = () => {
  const [otp, setOtp] = useState("");
  const [isSend, setIsSend] = useState(false)
  const [isCorrect, setIsCorrect] = useState("")
  const navigate= useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let res = await sendOTP(otp)
      console.log(res.data.message)
      setIsCorrect(res.data.message)
      setTimeout(()=>{
        navigate('/dashboard')
      },1000)
    }
    catch(err){
      console.log(err.response?.data?.message || err.message)
      setIsCorrect(err.response?.data?.message || err.message)
    }
    
    
  };

const handleOTP = async () => {
  try{
    let res = await generateOTP();
    console.log(res.data.message)
    setIsCorrect(res.data.message)
    setIsSend(true)

  }
  catch(err){
    console.log(err.response?.data?.message || err.message)
  }
}

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2 mt-2 text-center"> {isSend ? 'Masukkan Kode OTP' : 'kirim OTP code'}</h2>
        <Link to="/dashboard" className="fixed top-3 left-4 text-3xl" >
        <FiArrowLeft/>
        </Link>
      
        {isSend ? 
        <>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          className="border px-3 py-2 rounded w-full mb-2"
        />
         
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{isCorrect}</span>
        <div className="flex justify-center gap-2 ">
        <DangerButton className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
          <Link to="/dashboard">
            Cancel
          </Link>
          </DangerButton>
          <PrimaryButton
            onClick={handleSubmit}
            
          >
            Submit
          </PrimaryButton>
        </div>
        </div>
          </>
         : <><div className="flex justify-center items-center">
          <PrimaryButton onClick={handleOTP}>Kirim</PrimaryButton>
         </div>
         </>
         }
     
      </div>
    </div>
  );
};

export default OtpModal;