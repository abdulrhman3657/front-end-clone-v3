import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";
import { Link } from "react-router";

function SignUpFirstStep({ formData = {}, setFormData, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const roles = [
    { label: "Investor", value: "investor" },
    { label: "Founder", value: "founder" },
    { label: "Critic", value: "critic" },
  ];
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };
  return (
<div className="flex flex-col min-h-screen justify-center items-center px-4 py-6 bg-gray-50">
  
  {/* signup text */}
  <div className="mb-6">
    <p className="text-2xl font-bold text-center">SIGN UP</p>
    <p className="text-lg font-bold text-center">Create New Account</p>
    <p className="text-sm font-medium text-center text-[#9CA3AF]">
      Join our startup community
    </p>
  </div>

  {/* signup steps */}
  {/* <div className="flex justify-center items-center gap-4 mb-6">
    <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
      <p className="py-2 px-4 rounded-full bg-[#1E40AF] text-lg font-bold text-white">1</p>
    </div>
    <p><sup className="text-3xl font-extrabold text-[#1E40AF]">______</sup></p>
    <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
      <p className="py-2 px-4 rounded-full bg-white text-lg font-bold text-black">2</p>
    </div>
  </div> */}

  {/* form + image section */}
  <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full max-w-6xl  p-6 rounded-lg ">
    
    {/* Image */}
    <img
      src={investmentIdea}
      alt="Idea"
  className="hidden lg:block h-40 sm:h-60 md:h-80 object-contain"
    />

    {/* Form */}
    <div className="w-full max-w-md">
      <div className="mb-4">
        <p className="text-sm font-medium">Select Your Role:</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {roles.map(({ label, value }) => (
          <div
            key={value}
            className={`flex flex-col justify-center items-center gap-1 border border-gray-300 rounded-lg py-2 px-2 cursor-pointer hover:bg-[#1e40afd0] hover:text-white
              ${formData.role === value ? "bg-[#1e40afeb] text-white" : ""}`}
            onClick={() => handleRoleSelect(value)}
          >
            {label === "Investor" && <SiCashapp />}
            {label === "Founder" && <FaRegLightbulb />}
            {label === "Critic" && <FaStar />}
            <p className="text-sm font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Form Inputs */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            placeholder="e.g. user@example.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-2 h-10 w-full outline-none"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button
          onClick={onNext}
          className="mt-4 py-2 w-full rounded-lg bg-[#1E40AF] text-white text-sm font-medium"
        >
          Next
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#1E40AF] hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  );
}

export default SignUpFirstStep;
