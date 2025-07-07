import React, { useEffect, useRef, useState } from "react"
import { FiLogOut } from "react-icons/fi";
import { TbUpload } from "react-icons/tb";
import { getCurrentUser, logOut, updateProfile } from "../services/auth.service";
import { useNavigate } from "react-router";

function UserProfile({ onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png");
  const fileInputRef = useRef();
 useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        setName(data.name || name);
        setEmail(data.email || email);
        setGender(data.gender || gender);
        setCountry(data.country || country);
        setCity(data.city || city);
        setAvatar(data.profilePic || avatar);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    const data = {
      name,
      email,
      gender,
      country,
      city,
      avatar,
    };
    try {
      const updated = await updateProfile(avatar);
      if (updated?.profilePic) {
        setAvatar(updated.profilePic);
      }
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
    setIsEditing(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("profileData");
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className=" mx-auto bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden p-7 space-y-6 border border-gray-200">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="relative cursor-pointer"
          onClick={() => isEditing && fileInputRef.current.click()}
        >
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-200 shadow-md"
          />
          {isEditing && (
            <div className="absolute bottom-0 right-0 bg-blue-700 p-1.5 rounded-full">
           <TbUpload className="text-white" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        {isEditing ? (
          <>
              {/* <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold text-center text-gray-800 border-b-2 border-blue-400 focus:outline-none"
              /> */}

            <h2 className=" text-xl font-bold text-center text-gray-800 border-b-2 border-white focus:outline-none">{name}</h2>
           
          </>
        ) : (
          <>
            <h2 className=" text-xl font-bold text-center text-gray-800 border-b-2 border-white focus:outline-none">{name}</h2></>)}
            <p className="text-gray-400 text-sm cursor-not-allowed select-none">{email}</p>
          
        
      </div>

      {/* Details */}
      <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 space-y-2 shadow-inner">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Gender:</span>
      
            <span className="text-gray-800 font-semibold">{gender}</span>
         
        </div>
        <div className="flex justify-between gap-2 md:gap-26">
          <span className="font-medium text-gray-600">Country:</span>
  
            <span className="text-gray-800 font-semibold">{country}</span>
          
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">City:</span>
     
            <span className="text-gray-800 font-semibold">{city}</span>
        
        </div>
      </div>

      {/* Button */}
      <button
        onClick={isEditing ? handleSave : toggleEdit}
        className="w-full py-2 mb-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition duration-200 shadow-md"
      >
        {isEditing ? "Save Profile" : "Edit Profile"}
      </button>

      {/* Save Button */}
      <button onClick={handleLogout} className="flex gap-1  justify-center w-full py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white  px-4 border border-red-500 hover:border-transparent rounded-full">
        <FiLogOut className="mt-1" /> LogOut
      </button>
    </div>


  )
}

export default UserProfile
