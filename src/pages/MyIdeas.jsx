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
          className="bg-yellow-400 text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-500"
        >
          Add Idea +
        </Link>
      </div>

      {loading ? (
        <div class="flex justify-center items-center gap-2 min-h-screen max-w-screen ">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-sm">No ideas found.</p>
      ) : (
        <div className="space-y-4 mb-12">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white border border-gray-200 rounded-md p-4 flex justify-between items-start"
            >
              <div>
                <div className="flex gap-2 ">
                  <h4 className="font-medium text-base mb-1">{idea.title}</h4>{" "}
                  <span className="flex items-center text-amber-400 font-medium">
                    <GoArrowUp className="mr-1" /> {idea.totalUpvotes}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  {idea.category && (
                    <span
                      className={`${
                        tagColors[idea.category.toLowerCase()] ||
                        "bg-gray-200 text-gray-700"
                      } px-2 py-1 rounded-full text-xs`}
                    >
                      {idea.category}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
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
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-1200"
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
