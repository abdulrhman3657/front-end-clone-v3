import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const signIn = async (email, password) => {
  const response = await axios.post(
    `${API}/auth/signin`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const signUp = async (formData) => {
  const response = await axios.post(
    `${API}/auth/signup`,
    {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      age: Number(formData.age),
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${API}/users/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch current user", err);
    return null;
  }
};

// profilePic
export const updateProfile = async (profilePic) => {
  // console.log(profilePic)
  const response = await axios.put(
    `${API}/users/updateProfile`,
    { profilePic },
    { withCredentials: true }
  );
  console.log(response.data)
  return response.data;
};

export const logOut = async () => {
  try {
      const res = await axios.post(
        `${API}/auth/signout`,
        {},
        { withCredentials: true }
      );
    console.log(res.data)
  } catch (err) {
    console.error(err)
  }
}
