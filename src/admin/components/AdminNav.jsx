// src/components/AdminNav.jsx
import { Link } from "react-router";

export default function AdminNav() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-xl font-bold text-blue-600">Admin Panel</div>

      {/* Navigation Links */}
      <div className="space-x-4 text-sm font-medium">
        <Link
          to="/admin/dashboard"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/comments"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Comments
        </Link>
        <Link
          to="/admin/users"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Users
        </Link>
      </div>
      <div className="space-x-4 text-sm font-medium">
        <button className="text-white py-2 px-3 bg-red-500/45 rounded-md hover:text-red-700 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
