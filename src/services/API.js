import axios from "axios";

const API_URL = "https://seenau-api.onrender.com/api/v1/";
export const login = async (email, password) => {
  return await axios.post(
    `${API_URL}auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const register = async (email, name, password) => {
  return await axios.post(`${API_URL}auth/register`, {
    email,
    name,
    password,
  });
};
export const getToken = async () => {
  return await axios.post(
    `${API_URL}auth/refresh-token`,
    {},
    {
      withCredentials: true,
    }
  );
};
export const generateOTP = async () => {
  return await axios.post(
    `${API_URL}auth/generate-otp-code`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const sendOTP = async (otpCode) => {
  return await axios.post(
    `${API_URL}auth/verifikasi-account`,
    {
      otpCode,
    },
    {
      withCredentials: true,
    }
  );
};

export const createTask = async (name, duration, category, description) => {
  return await axios.post(
    `${API_URL}task/`,
    {
      name,
      duration,
      category,
      description,
    },
    {
      withCredentials: true,
    }
  );
};
export const getUser = async () => {
  return await axios.get(`${API_URL}`);
};

export const getTasks = async () => {
  return await axios.get(`${API_URL}task/?limit=10`, {
    withCredentials: true,
  });
};

export const deleteTask = async (taskId) => {
  return await axios.delete(`${API_URL}task/${taskId}`, {
    withCredentials: true,
  });
};
export const updateTask = async (taskId, name, duration, category, description) => {
  return await axios.put(
    `${API_URL}task/${taskId}`,
    {
      name,
      duration,
      category,
      description,
    },
    {
      withCredentials: true,
    }
  );
};

export const createPattern = async (name, focus_time, break_time, period, description, category) => {
  return await axios.post(
    `${API_URL}pattern`,
    {
      name,
      focus_time,
      break_time,
      period,
      description,
      category,
    },
    {
      withCredentials: true,
    }
  );
};

export const getAllPatterns = async () => {
  return await axios.get(
    `${API_URL}pattern`,
    
    {
      withCredentials: true,
    }
  );
};
