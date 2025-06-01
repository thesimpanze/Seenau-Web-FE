import axios from "axios";

const API_URL = "https://seenau-api.onrender.com/api/v1/";
// const API_URL = "http://localhost:3000/api/v1/";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
},{});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add loading state here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await getToken();
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    return await api.post("auth/login", { email, password });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const logout = async () => {
  try {
    return await api.get("auth/logout", { withCredentials: true });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

export const register = async (email, name, password) => {
  try {
    return await api.post("auth/register", { email, name, password });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


export const generateOTP = async () => {
  try {
    return await api.post("auth/generate-otp-code");
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP generation failed");
  }
};

export const sendOTP = async (otpCode) => {
  try {
    return await api.post("auth/verifikasi-account", { otpCode });
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};

export const createTask = async (name, duration, category, description) => {
  try {
    return await api.post("task/", { name, duration, category, description });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
};

export const getUser = async () => {
  try {
    return await api.get("");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};

export const getTasks = async () => {
  try {
    return await api.get("task/?limit=10");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

export const deleteTask = async (taskId) => {
  try {
    return await api.delete(`task/${taskId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};

export const updateTask = async (taskId, name, duration, category, description) => {
  try {
    return await api.put(`task/${taskId}`, { name, duration, category, description });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};

export const createPattern = async (name, focus_time, break_time, period, description, category) => {
  try {
    return await api.post("pattern", {
      name,
      focus_time,
      break_time,
      period,
      description,
      category,
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create pattern");
  }
};

export const getAllPatterns = async () => {
  try {
    return await api.get("pattern?limit=50");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch patterns");
  }
};
