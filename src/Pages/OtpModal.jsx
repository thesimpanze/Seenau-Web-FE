import { useState } from "react";

import DangerButton from "../components/DangerButton";
import { generateOTP, sendOTP } from "../services/API";
import { FiArrowLeft } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import UseAuthCheck from "../services/UseAuthCheck";
import Squares from "../components/Squares";
import BigPrimaryButton from "../components/BigPrimaryButton";

const OtpModal = () => {
  const [otp, setOtp] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
  const navigate = useNavigate();
  const isAuth = UseAuthCheck();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await sendOTP(otp);
      console.log(res.data.message);
      setIsCorrect(res.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setIsCorrect(err.response?.data?.message || err.message);
    }
  };
  const handleOTP = async () => {
    try {
      let res = await generateOTP();
      console.log(res.data.message);
      setIsCorrect(res.data.message);
      setIsSend(true);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen md:px-0 px-6">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#b0b0b0" hoverFillColor="#f0f0f0" />
      </div>
      {!isAuth.isAuth && <AuthModal />}
      <div className="bg-white p-6 rounded-sm outline-slate-500 outline-1 shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2 mt-2 text-center"> {isSend ? "Masukkan Kode OTP" : "kirim OTP code"}</h2>
        <Link to="/dashboard" className="fixed top-3 left-4 text-3xl">
          <FiArrowLeft />
        </Link>

        {isSend ? (
          <>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" className="border px-3 py-2 rounded w-full mb-2" />

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{isCorrect}</span>
              <div className="flex justify-center gap-2 ">
                <DangerButton className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                  <Link to="/dashboard">Cancel</Link>
                </DangerButton>
                <BigPrimaryButton onClick={handleSubmit}>Submit</BigPrimaryButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <BigPrimaryButton onClick={handleOTP}>Kirim</BigPrimaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpModal;
