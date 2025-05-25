import { useState } from "react";
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";
import OtpModal from "../Pages/OtpModal";
import SecondaryButton from "./SecondaryButton";
import axios from "axios";
import { generateOTP } from "../services/API";
import { Navigate, useNavigate, Link } from "react-router-dom";

const EditProfile = ({ onCancel }) => {
  const navigate = useNavigate();
  const handleOTP = () => {
    navigate("/otp");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
        <div className="bg-white w-full max-w-xl p-8 rounded-lg relative shadow-lg shadow-gray-600">
          <button onClick={onCancel} className="absolute top-3 right-4 text-2xl font-bold">
            ×
          </button>

          <div className="flex gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">KJ</div>
            <form className="flex-1 flex flex-col gap-3">
              <label className="font-semibold">Full Name</label>
              <input type="text" value={user.name} placeholder="Name" className="border px-3 py-2 rounded" disabled />

              <label className="font-semibold">Email</label>
              <input type="email" value={user.email} placeholder="Email" className="border px-3 py-2 rounded" disabled />

              <div className="flex gap-4 text-sm">
                <PrimaryButton>Save Changes</PrimaryButton>
                <Link to="/otp">
                  <SecondaryButton type="button">Verfikasi</SecondaryButton>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
