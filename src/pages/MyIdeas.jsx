import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import tagColors from "../Component/CatagoryColors";
import { Link } from "react-router";
import { fetchMyIdeas } from "../services/ideas.service";

export default function MyIdeas() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const data = await fetchMyIdeas();
        setIdeas(data);
      } catch (err) {
        console.error("Failed to load ideas", err);
        setError("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  return (
    <div className=" px-4 md:px-10 py-10  min-h-screen max-w-screen  mx-auto bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90% font-ibm  text-[#333333]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">My Ideas</h1>
        <p className="text-sm text-gray-500">
          View and edit your personal details
        </p>
      </div>

      {/* Submitted Ideas */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-lg">Your Submitted Ideas</h3>
        <Link
          to={"/submitIdea"}
          className="bg-[#1E40AF] text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-500"
        >
          Add Idea +
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center gap-2 min-h-screen max-w-screen ">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-sm">No ideas found.</p>
      ) : (
<div className="space-y-4 mb-12 flex flex-col-reverse gap-3">
  {ideas.map((idea) => (
    <div
      key={idea._id}
      className="bg-white rounded-md p-4 flex justify-between items-start shadow-sm border border-gray-100"
    >
      <div className="flex-1 w-full pr-4">
        {/* Title + Upvotes */}
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-base text-gray-900">{idea.title}</h4>
          <span className="flex items-center text-amber-400 text-sm font-medium">
            <GoArrowUp className="mr-1" />
            {idea.totalUpvotes}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {idea.description}
        </p>

        {/* Tag */}
        {idea.category && (
          <span
            className={`${
              tagColors[idea.category.toLowerCase()] ||
              "bg-gray-200 text-gray-700"
            } px-3 py-1 rounded-full text-xs font-medium inline-block`}
          >
            {idea.category}
          </span>
        )}
      </div>

      <div className="relative">
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() =>
            setActiveMenu(activeMenu === idea._id ? null : idea._id)
          }
        >
          <BiDotsVerticalRounded size={20} />
        </button>

        {activeMenu === idea._id && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-10">
            <Link
              to={`/detailIdea/${idea._id}`}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              View Detail
            </Link>
            <Link
              to={`/IdeaAnalysis/${idea._id}`}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              Analysis
            </Link>
            <button className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


      )}
    </div>
  );
}
