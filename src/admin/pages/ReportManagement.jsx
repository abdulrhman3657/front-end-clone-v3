import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Toaster } from 'react-hot-toast';
import { MdBlock } from 'react-icons/md';

const API_URL = 'https://finalproject-backend-1bnt.onrender.com/api';

export default function ReportManagement() {
  const [search, setSearch] = useState('');
  const [reportedComments, setReportedComments] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [commentsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/admin/repoted-comments`, { // /api/admin/repoted-comments
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/admin/repoted-users`, { // /api/admin/repoted-users
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const formattedComments = (commentsRes.data.data || []).map((r) => ({
          id: r.comment?._id || r._id,
          userId:
            r.comment?.userId ||
            r.comment?.user?._id ||
            r.userId ||
            '',
          text: r.comment?.text || '',
          count: r.count,
        }));

        const formattedUsers = (usersRes.data.data || [])
          .map((u) => ({
            id: u.id || u._id,
            name: u.name,
            email: u.email,
            reportCount: u.reportCount,
            blocked: u.blocked,
          }))
          .filter((u) => !u.blocked);

        setReportedComments(formattedComments);
        setReportedUsers(formattedUsers);
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${API_URL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setReportedComments(reportedComments.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/block-user/${id}`, null, { // /api/admin/block-user/68663d8ae6abd06ebfb328c8
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setReportedUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Failed to block user:', err);
    }
  };

  return (
    <>
      <NavAdmin />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <Toaster />

        <div className="mb-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Report Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">View and manage user and comment reports</p>
        </div>

        {/* Reported Comments */}
        <div className="bg-white p-4 rounded-lg shadow mb-10">
          <h2 className="text-lg font-semibold mb-4">Reported Comments</h2>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Reports</th>
                <th className="px-4 py-2">Comment ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">Loading...</td>
                </tr>
              ) : reportedComments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No comment reports found.</td>
                </tr>
              ) : (
                reportedComments.map((report) => (
                  <tr key={report.id} className="border-b border-gray-300">
                    <td className="px-4 py-2 text-gray-700">{report.text}</td>
                    <td className="px-4 py-2">{report.count}</td>
                    <td className="px-4 py-2 text-gray-500">{report.id}</td>
                    <td className="px-4 py-2 text-gray-500">{report.userId}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleDeleteComment(report.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
                      >
                        <RiDeleteBin6Line /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Reported Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Reported Users</h2>
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Reports</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">Loading...</td>
                </tr>
              ) : reportedUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No user reports found.</td>
                </tr>
              ) : (
                reportedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2 text-gray-600">{user.email}</td>
                    <td className="px-4 py-2 text-gray-700">{user.reportCount}</td>
                    <td className=" flex gap-1 px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
                      >
                        <MdBlock /> Block
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
