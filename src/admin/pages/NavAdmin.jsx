import React from 'react'
import { Link } from 'react-router';

function NavAdmin() {
  return (
  <nav className="bg-[#f5f6f8] px-6 py-3 flex justify-between items-center border-b">
      <div className="text-blue-700 font-semibold text-lg">
       StartUp Arena
      </div>

      <div className="flex items-center gap-4">
        <Link to={"/admin/adminDashboard"} className="text-sm text-gray-700 hover:text-black">
          Dashboard
        </Link>
        <Link to={"/admin/manageComments"} className="text-sm text-gray-700 hover:text-black">
          Manage Comments
        </Link>
        <Link to={"/admin/manageReport"} className="text-sm text-gray-700 hover:text-black">
          Manage Report
        </Link>
      </div>

        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("adminUser");
            window.location.href = "/admin";
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
    </nav>  )
}

export default NavAdmin