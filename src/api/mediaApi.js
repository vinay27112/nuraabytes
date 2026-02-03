import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const postSignUpData = async (data) => {
  try {
    const response = await axios.post(backendUrl + "/api/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error in postSignUpData:", error.message);
    return error.response?.data || { success: false, message: error.message };
  }
};

export const postLoginData = async (data) => {
  console.log("postLoginData called with:", data);
  try {
    const response = await axios.post(backendUrl + "/api/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error in postLoginData:", error.message);
    return error.response?.data || { success: false, message: error.message };
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/user/data");
    return response.data;
  } catch (error) {
    console.error("Error in fetchUserData:", error.message);
    throw error;
  }
};

export const fetchAuthStatus = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/auth/is-auth");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // 🔕 Silent fail – user is simply logged out
      return { success: false };
    }

    // Only log REAL errors
    console.error("fetchAuthStatus error:", error.message);
    return { success: false };
  }
};
