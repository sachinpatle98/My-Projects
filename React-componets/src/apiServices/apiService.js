import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


export const logout = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      return { statusCode: 401, message: "No token available" };
    }

    const response = await api.post("/auth/logout", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error.response?.data || { statusCode: 500, message: "Server Error" };
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await api.post("/auth/forget-password", { email });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Server Error" };
  }
};


export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error in resetPassword:", error.response?.data || error);
    throw error;
  }
};

export const getUserLoginSessions = async (token) => {
  try {
    const response = await api.post("/auth/get-login-sessions", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error.response?.data || { statusCode: 500, message: "Server Error" };
  }
};

export const getProfileData = async (token) => {
  try {
    const response = await api.get("/auth/get-profile-data", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { statusCode: 500, message: "Server Error" };
  }
};

export const updateProfileData = async (token) => {
  try {
    const response = await api.get("/auth/update-profile-data", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    return error.response?.data || { statusCode: 500, message: "Server Error" };
  }
};





