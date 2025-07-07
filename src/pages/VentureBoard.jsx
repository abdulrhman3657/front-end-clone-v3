import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchVentureBoard } from "../services/venture-board.service";
import { getCurrentUser } from "../services/auth.service";

function VentureBoard() {
  const [ideas, setIdeas] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const [ventureData, userData] = await Promise.all([
          fetchVentureBoard(),
          getCurrentUser(),
        ]);
        setIdeas(ventureData.data);
        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  if (loading)
    return (
      <div class="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <div className="min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90% font-ibm  text-[#333333]">
      <div className=" px-4  md:px-8 py-10 text-[#333333]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] font-bold font-inter">
            The Venture Board
          </h1>
          <p className="text-[16px] text-[#888888] font-inter">
            High-performing ideas with <span className="font-bold"> 100+ </span>
            community votes
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-5">
          <div className="relative w-full md:w-1/3">
            <span className="absolute left-3 top-2.5 text-[#888888]">
              <IoSearch />
            </span>
            <input
              type="text"
              placeholder="Search ideas..."
              className="w-full pl-10 pr-4 py-2 border outline-none border-[#969595] rounded-lg text-sm "
            />
          </div>

          <div className="flex flex-wrap justify-end gap-4 w-full md:w-2/3">
            {["All createdAt", "Most Upvoted"].map((label, i) => (
              <select
                key={i}
                className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm text-[#333333]"
              >
                <option>{label}</option>
              </select>
            ))}
          </div>
        </div>
        <IdeaCard ideas={ideas} userRole={currentUser?.role} />
      </div>
    </div>
  );
}

export default VentureBoard;
