import React from "react";
import { investmentIdea } from "../public/ExporImage";
import { FaCheck } from "react-icons/fa6";

function SignUpSecondStep({ formData, setFormData, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 py-6 bg-gray-50">
  {/* signup text */}
  <div className="mb-6 text-center">
    <p className="text-2xl font-bold mb-2">SIGNUP</p>
    <p className="text-lg font-bold">Create New Account</p>
    <p className="text-sm font-medium text-[#9CA3AF]">Join our startup community</p>
  </div>

  {/* signup steps */}
  {/* <div className="flex justify-center items-center gap-4 mb-6">
    <div className="p-1 rounded-full bg-[#1E40AF]">
      <div className="p-2 rounded-full bg-[#1E40AF] text-white text-lg font-bold">
        <FaCheck size={18} />
      </div>
    </div>
    <p><sup className="text-3xl font-extrabold text-[#1E40AF]">______</sup></p>
    <div className="p-1 rounded-full bg-[#1E40AF]">
      <p className="py-2 px-4 rounded-full bg-[#1E40AF] text-lg font-bold text-white">2</p>
    </div>
  </div> */}

  {/* image + form section */}
  <div className="flex flex-col lg:flex-row justify-center items-center gap-10  p-6 rounded-lg  w-full max-w-5xl">
    {/* image */}
    <img src={investmentIdea} alt="Investment"   className="hidden lg:block h-40 sm:h-60 md:h-80 object-contain"
 />

    {/* form */}
    <div className="w-full max-w-md">
      <div className="text-black flex flex-col gap-4">
        <div>
          <label className="text-md font-medium">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="e.g. 25"
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-md font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <label className="text-md font-medium">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
          >
            <option value="">Select country</option>
            <option>Saudi Arabia</option>
            <option>Kuwait</option>
            <option>The United Arab Emirates</option>
            <option>Qatar</option>
            <option>Bahrain</option>
            <option>Oman</option>
          </select>
        </div>

        <div>
          <label className="text-md font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onBack}
            className="text-sm font-medium py-2 w-full rounded-lg bg-gray-300 text-black"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default SignUpSecondStep;
