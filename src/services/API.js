import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/";
export const login = async (email, password) => {
  return await axios.post(`${API_URL}auth/login`,
    {
      email,password
    }
    ,
    {
      withCredentials: true
    }
  );
};

export const register = async (email, name, password) =>{
  return await axios.post(`${API_URL}auth/register`, {
    email, name, password
  })
};
export const generateOTP = async () =>{
  return await axios.post(`${API_URL}auth/generate-otp-code`, {
    
  })
};


