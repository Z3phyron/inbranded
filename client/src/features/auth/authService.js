import axios from "axios";

const API_URL = "/api/auth/";

// Register user
const signUp = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const signIn = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const SignOut = () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  SignOut,
  signIn,
};

export default authService;
