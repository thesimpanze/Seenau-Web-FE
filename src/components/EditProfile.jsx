import { useState } from "react";
import DangerButton from "./DangerButton"
import PrimaryButton from "./PrimaryButton"
import OtpModal from "../Pages/OtpModal";
import SecondaryButton from "./SecondaryButton";
import axios from "axios";
import { generateOTP } from "../services/API";
import { Navigate, useNavigate } from "react-router-dom";






const EditProfile = ({ onCancel }) => {
  const navigate = useNavigate()
  const handleOTP =()=> {
   navigate('/otp')
    
  };

  
    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-white w-full max-w-xl p-8 rounded-lg relative shadow-lg shadow-gray-600">
            <button
              onClick={onCancel} 
              className="absolute top-3 right-4 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
                KJ
              </div>
              <form className="flex-1 flex flex-col gap-3">
                <label className="font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border px-3 py-2 rounded"
                />

                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border px-3 py-2 rounded"
                />

                <label className="font-semibold mt-2">Change Password</label>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border px-3 py-2 rounded"
                />
                

                <div className="flex gap-4 text-sm">
                  <PrimaryButton
                    
                  >
                    Save Changes
                  </PrimaryButton>
                  <DangerButton
                    
                  >
                    Delete Account
                  </DangerButton>
                  <SecondaryButton 
                  type="button"
                  
                  onClick={handleOTP}

                  >
                  Verfikasi
                  </SecondaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>

        

        </>
    )
}
export default EditProfile