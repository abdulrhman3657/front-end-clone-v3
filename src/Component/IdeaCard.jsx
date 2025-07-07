import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import tagColors from "../Component/CatagoryColors";
import { Link } from "react-router";
import RequestMeetingModal from "./RequestMeetingModal.jsx";
import { scheduleMeeting } from "../services/zoom.service";

export const IdeaCard = ({ ideas = [], userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [IdeaId, setIdeaId] = useState(null);

  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    isPrivate: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        userId: "me",
        targetType: "idea",
        targetId: IdeaId,
      };

      const meeting = await scheduleMeeting(payload);
      console.log("Meeting created:", meeting);
      closeModal();
      setFormData({
        topic: "",
        start_time: "",
        duration: 30,
        isPrivate: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white drop-shadow-lg rounded-lg p-4 relative transform transition-transform duration-300 ease-in-out hover:translate-1 hover:scale-100"
          >
            <div className="absolute right-4 top-4 text-amber-300 px-2 py-1 rounded flex items-center gap-1">
              <GoArrowUp /> {idea.totalUpvotes}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`${
                  tagColors[idea.category.toLowerCase()] ||
                  "bg-gray-200 text-gray-700"
                } px-2 py-1 text-xs rounded-full`}
              >
                {idea.category}
              </span>
            </div>

            <div className="text-[18px] font-semibold mb-2"> <Link           to={`/detailIdea/${idea._id}`}
> {idea.title}</Link></div>

            <p className="text-[14px] text-[#666666] line-clamp-3">
              {idea.description}
            </p>

            <div className="text-[14px] flex gap-2 font-semibold text-[#666666] my-3">
              <p className=" text-black">Target market:</p>
              <p className="text-blue-800 ">{idea.targetMarket}</p>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <div className="text-[13px] text-[#888888]">
                by {idea.founderId?.name}
                <br />
                <span className="italic text-xs font-light">
                  {new Date(idea.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {userRole === "investor" && (
                <div>
                  <button
                    onClick={() => { 
                      setIdeaId(idea._id);
                      openModal();
                    }}
                    className="mt-4 bg-[#1E40AF] text-white px-4 py-2 rounded hover:bg-[#1e40afc6] w-full"
                  >
                    Request Meeting
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button className="border border-gray-300 px-6 py-3 rounded-[10px] text-[16px] font-medium focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
          Load More Ideas
        </button>
      </div>

      {/* Modal */}
      <RequestMeetingModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};
