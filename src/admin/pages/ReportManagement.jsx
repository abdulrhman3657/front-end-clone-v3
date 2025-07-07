import React, { useState } from 'react';
import NavAdmin from './NavAdmin';
import { RiDeleteBin6Line, RiProhibitedLine } from 'react-icons/ri';
import { Toaster } from 'react-hot-toast';
import { MdBlock } from 'react-icons/md';

export default function ReportManagement() {
  const [search, setSearch] = useState('');

  const reportedComments = [
    { id: 1, content: 'This is offensive', reporter: 'user1@example.com', commentId: 'c123' },
    { id: 2, content: 'Spam content here', reporter: 'user2@example.com', commentId: 'c456' },
  ];

  const reportedUsers = [
    { id: 1, name: 'ToxicUser', email: 'toxic@example.com', reason: 'Harassment', reporter: 'mod@example.com' },
    { id: 2, name: 'SpamBot', email: 'spam@example.com', reason: 'Spamming links', reporter: 'admin@example.com' },
  ];

  const handleDeleteComment = (id) => {
    console.log('Deleted comment report ID:', id);
  };

  const handleBlockUser = (id) => {
    console.log('Blocked user ID:', id);
  };

  const handleDismissUserReport = (id) => {
    console.log('Dismissed report ID:', id);
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
                <th className="px-4 py-2">Reporter</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Comment ID</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedComments.map((report) => (
                <tr key={report.id} className="border-b border-gray-300">
                  <td className="px-4 py-2">{report.reporter}</td>
                  <td className="px-4 py-2 text-gray-700">{report.content}</td>
                  <td className="px-4 py-2 text-gray-500">{report.commentId}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDeleteComment(report.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {reportedComments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No comment reports found.</td>
                </tr>
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
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Reported By</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2 text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 text-gray-700">{user.reason}</td>
                  <td className="px-4 py-2 text-gray-500">{user.reporter}</td>
                  <td className=" flex gap-1 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
                    >
                      <MdBlock /> Block
                    </button>
                    <button
                      onClick={() => handleDismissUserReport(user.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400"
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
              {reportedUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No user reports found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
