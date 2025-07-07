import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://finalproject-backend-1bnt.onrender.com/api/auth/signin ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("adminUser", JSON.stringify(data.data.user));

      // Show success message
    toast.success("Logged In!")

      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "/admin/adminDashboard"; 
      }, 1600);
    } catch (error) {
     toast.error("Login Failed")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* Header Tabs */}
        <Toaster/>
        <div className="flex justify-between mb-6">
          <button className="px-4 py-1 rounded-md bg-blue-600 text-white text-sm font-semibold">
            Admin Login
          </button>
         
        </div>

          {/* Welcome Text */}
          <h2 className="text-xl font-bold mb-1">Welcome Back, Admin</h2>
          <p className="text-gray-500 text-sm mb-6">
            Sign in to your admin panel
          </p>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}