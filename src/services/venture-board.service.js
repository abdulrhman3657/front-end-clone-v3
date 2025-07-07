import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchVentureBoard = async () => {
  const res = await axios.get(`${API}/venture-board`);
  return res.data;
};

