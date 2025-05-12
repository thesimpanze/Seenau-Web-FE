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
  return await axios.post(`${API_URL}auth/generate-otp-code`, {},{
    withCredentials: true
  })
};

export const sendOTP = async (otpCode) =>{
  return await axios.post(`${API_URL}auth/verifikasi-account`,{
    otpCode
  },
  {
    withCredentials:true
  })
}

export const createTask = async (name, duration, category, description) =>{
  return await axios.post(`${API_URL}task/`, {
    name, duration, category, description
  },
  {
    withCredentials:true
  })
}
export const getUser = async () =>{
  return await axios.get(`${API_URL}`)
}


