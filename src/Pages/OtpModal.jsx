import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import DangerButton from "../components/DangerButton";
import axios from "axios";

const OtpModal = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    console.log("OTP submitted:", otp);
    
    
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Masukkan Kode OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          className="border px-3 py-2 rounded w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <DangerButton
            
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </DangerButton>
          <PrimaryButton
            onClick={handleSubmit}
            
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;