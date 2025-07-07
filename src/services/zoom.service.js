import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const scheduleMeeting = async (data) => {
  const res = await axios.post(`${API}/zoom/create-meeting`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const zoomRecordings = async () => {
  const res = await axios.get(`${API}/zoom/recordings`);
  console.log(res)
  return res.data;
};

