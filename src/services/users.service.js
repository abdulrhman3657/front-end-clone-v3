import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/api/users`);
  return response.data;
};
