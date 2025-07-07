import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import NavAdmin from "./NavAdmin";

export default function ManageComments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [ideasMap, setIdeasMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const accessToken = localStorage.getItem("accessToken");

        // Fetch all users
        const usersRes = await axios.get("https://finalproject-backend-1bnt.onrender.com/api/admin/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userMap = {};
        usersRes.data.data.forEach((user) => {
          const id = String(user._id);
          userMap[id] = user.name;
        });
        setUsersMap(userMap);

        // Fetch all ideas
        const ideasRes = await axios.get("https://finalproject-backend-1bnt.onrender.com/api/ideas", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const ideaMap = {};
        ideasRes.data.data.forEach((idea) => {
          const id = String(idea._id);
          ideaMap[id] = {
            title: idea.title,
            _id: idea._id,
          };
        });
        setIdeasMap(ideaMap);

        // Fetch comments
        const commentsRes = await axios.get("https://finalproject-backend-1bnt.onrender.com/api/comments", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Format comments
        const formatted = commentsRes.data.data.map((c) => {
          const userId = String(c.userId || c.user?._id);
          const ideaId = String(c.ideaId);

          return {
            id: c._id,
            userId,
            userName: userMap[userId] || "Unknown User",
            userEmail: c.user?.email || "N/A",
            comment: c.text,
            ideaTitle: ideaMap[ideaId]?.title || "Untitled Idea",
            ideaId: ideaId,
            date: new Date(c.createdAt).toLocaleString(),
          };
        });

        setComments(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = comments.filter(
    (item) =>
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()) ||
      item.ideaTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This comment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://finalproject-backend-1bnt.onrender.com/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setComments(comments.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Comment has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete comment.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Toaster />
      <NavAdmin/>

      {/* Header */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Manage Comments</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            View, moderate, and delete user comments
          </p>
        </div>

       
      </div>

      {/* Search + Table Card */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-md sm:text-lg font-semibold">All Comments</h2>
          <input
            type="text"
            placeholder="Search by user, content, or idea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search comments"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-2 min-w-[120px]">User</th>
                <th scope="col" className="px-4 py-2 min-w-[200px]">Comment</th>
                <th scope="col" className="px-4 py-2 min-w-[150px]">Idea Title</th>
                <th scope="col" className="px-4 py-2 min-w-[120px]">Date</th>
                <th scope="col" className="px-4 py-2 min-w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Loading comments...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No comments found.
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={i} className="border-b border-gray-400">
                    <td className="px-4 py-2">
                      <p className="font-medium">{item.userName}</p>
                      <p className="text-gray-500 text-xs">{item.userEmail}</p>
                    </td>
                    <td className="px-4 py-2 text-gray-700 truncate max-w-xs">
                      {item.comment}
                    </td>
                    <td
                      className="px-4 py-2 text-blue-600 underline cursor-pointer"
                      onClick={() => navigate(`/detailIdea/${item.ideaId}`)}
                    >
                      {item.ideaTitle}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.date}</td>
                    <td className="flex gap-1 px-4 py-2 space-x-2 whitespace-nowrap">
                      
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="flex gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto mt-2 sm:mt-0"
                      >
                       <RiDeleteBin6Line className="mt-1+" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}