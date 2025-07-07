import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import NavAdmin from "./NavAdmin";

const API_URL = "https://finalproject-backend-1bnt.onrender.com/api/";

const roleColors = {
  Investor: "bg-blue-200 text-blue-800",
  Critic: "bg-gray-300 text-gray-800",
  Founder: "bg-yellow-200 text-yellow-800",
};

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
     toast.error("Failed to load users")
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}admin/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          setUsers(users.filter((u) => u.id !== userId));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  const capitalizeRole = (role) =>
    role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <>
    <NavAdmin/>
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Toaster/>
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Overview of platform metrics and user management
          </p>
        </div>

      
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" count={users.length} />
        <StatCard title="Total Critic" count={users.filter((u) => u.role === "critic").length} />
        <StatCard title="Total Investor" count={users.filter((u) => u.role === "investor").length} />
        <StatCard title="Total Founder" count={users.filter((u) => u.role === "founder").length} />
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-md sm:text-lg font-semibold">All Registered Users</h2>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search users"
          />
        </div>

        {loading ? (
          <p className="text-center py-4">Loading users...</p>
        ) : (
          <div className="overflow-x-auto" role="region">
            <table className="w-full text-sm text-left table-auto">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-2 min-w-[120px]">Full Name</th>
                  <th scope="col" className="px-4 py-2 min-w-[150px]">Email</th>
                  <th scope="col" className="px-4 py-2 min-w-[100px]">Role</th>
                  <th scope="col" className="px-4 py-2 min-w-[100px]">Country</th>
                  <th scope="col" className="px-4 py-2 min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-400">
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2 text-gray-600">{user.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          roleColors[capitalizeRole(user.role)] || "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {capitalizeRole(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-2">{user.country || "-"}</td>
                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                      
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBin6Line className="mt-1+" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div></>
  );
}

function StatCard({ title, count }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}