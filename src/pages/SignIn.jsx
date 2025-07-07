import React from "react";
import { investmentIdea } from "../public/ExporImage";
import { signIn } from "../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      console.log("Signed in", data);
      navigate("/allIdeas");
    } catch (err) {
      console.error(err);
      setError("Email or password is incorrect.");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center p-3 bg-white">
        <div>
          <div className="p-3">
            <p className="text-2xl font-bold text-center">SIGN IN</p>
            <p className="font-medium text-gray-600">Welcome Back!</p>
          </div>
        </div>
        <div className="w-full max-w-4xl  rounded-lg bg-white flex flex-col md:flex-row justify-center items-center gap-6 p-5">
          {/* Left Section - Image & Back Link */}
          <div className="flex flex-col items-center text-center md:text-left md:items-start">
            <img
              src={investmentIdea}
              alt="Investment Idea"
              className="hidden md:block h-40 sm:h-60 md:h-80 object-contain"
            />
          </div>

          {/* Right Section - Sign In Form */}
          <div className="w-full max-w-md mt-6 md:mt-0">
            <div className="text-black">
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                <div className="flex flex-col p-1 gap-1 w-full">
                  <label className="text-md font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  />
                  <span className="text-xs text-[#9CA3AF]">
                    Please enter your email address
                  </span>
                </div>
                <div className="flex flex-col p-1 gap-1 w-full">
                  <label className="text-md font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  />
                  <span className="text-xs text-[#9CA3AF]">
                    Password should be greater than 8 letters
                  </span>
                </div>
                <div className="w-full flex items-center justify-center mt-3">
                  <button
                    type="submit"
                    className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white cursor-pointer hover:bg-blue-800 transition"
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?
                    <Link
                      to="/signup"
                      className="text-[#1E40AF] hover:underline font-medium ml-1"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
                {error && (
                  <p className="text-red-700 text-xs mt-2 text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
