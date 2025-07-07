import React, { useEffect, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { useParams, Link } from "react-router";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { fetchIdeaById } from "../services/ideas.service";
import {
  fetchCommentsByIdeaId,
  postComment,
} from "../services/comments.service";
import { voteIdea } from "../services/ideas.service";
import { getCurrentUser } from "../services/auth.service";
import { fetchUserVote } from "../services/ideas.service";
import { voteOnComment } from "../services/comments.service";
import RequestMeetingModal from "../Component/RequestMeetingModal";
import { scheduleMeeting } from "../services/zoom.service";
import { FaStar } from "react-icons/fa";

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [voteStatus, setVoteStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [netVotes, setNetVotes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetType, setTargetType] = useState("comment");
  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    isPrivate: false,
  });
  const [score, setScore] = useState(55);

  const handleSubmitMeeting = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        userId: "me",
        targetType,
        targetId,
      };
      const meeting = await scheduleMeeting(payload);
      console.log("Meeting created:", meeting);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);

        const ideaData = await fetchIdeaById(id);
        setIdea(ideaData.data);
        setNetVotes(ideaData.data.totalUpvotes - ideaData.data.totalDownvotes);

        const commentsData = await fetchCommentsByIdeaId(id);
        setComments(
          commentsData.map((c) => ({
            id: c._id,
            user: c.userId,
            author: c.userId?.name || "Unknown",
            content: c.text,
            time: new Date(c.createdAt).toLocaleString(),
            upvotes: c.totalUpvotes,
            downvotes: c.totalDownvotes,
          }))
        );

        if (user?.id) {
          const vote = await fetchUserVote(user.id, id);
          setVoteStatus(vote === 1 ? "up" : vote === -1 ? "down" : null);
        }
      } catch (err) {
        setError("Idea not found");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id]);

  const handleUpvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "up" ? 0 : 1);
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes;

      setNetVotes(totalUpvotes - totalDownvotes);
      setVoteStatus(voteStatus === "up" ? null : "up");
    } catch (err) {
      console.error("Error voting up:", err);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "down" ? 0 : -1);
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes;

      setNetVotes(totalUpvotes - totalDownvotes);
      setVoteStatus(voteStatus === "down" ? null : "down");
    } catch (err) {
      console.error("Error voting down:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const createdComment = await postComment(id, newComment);
      setComments([
        {
          id: createdComment._id,
          author: createdComment.userId?.name || "You",
          content: createdComment.text,
          time: new Date(createdComment.createdAt).toLocaleString(),
          upvotes: createdComment.totalUpvotes || 0,
          downvotes: createdComment.totalDownvotes || 0,
        },
        ...comments,
      ]);

      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleCommentVote = async (commentId, voteValue) => {
    try {
      const result = await voteOnComment({
        commentId,
        ideaId: idea._id,
        vote: voteValue,
      });
      console.log("Vote result:", result);

      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                upvotes: result.data.upvotes,
                downvotes: result.data.downvotes,
              }
            : c
        )
      );
    } catch (err) {
      console.error(
        "Error voting on comment:",
        err?.response?.data?.message || err.message
      );
    }
  };

  if (loading)
    return (
      <div class="flex justify-center items-center gap-2 min-h-screen min-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!idea) return <p className="p-6">Idea not found.</p>;

  return (
    <>
      <Link
        to="/AllIdeas"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        <IoIosArrowBack /> Back
      </Link>

      <div className="mx-auto px-4 py-10 space-y-6">
        {/* Idea Card */}
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold">{idea.title}</h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mt-1">
              <p>{idea.founderId?.name}</p>
              <p className="flex gap-1 items-center">
                <CiCalendar className="mt-0.5" />
                {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              {idea.category}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="border border-gray-100 rounded p-4 text-sm text-gray-700 flex-1 whitespace-pre-line">
              {idea.description}
              <p className="mt-2 text-blue-800 ">
                <a
                  href={idea.mvpLink || "#"}
                  target="_blank"
                  className="flex gap-1 text-blue-800 hover:underline"
                >
                  <GoLinkExternal className="mt-1" /> MVP Document
                </a>
              </p>
            </div>

            <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0">
              <button
                disabled={!currentUser}
                onClick={handleUpvote}
                className={`p-2 rounded-full transition ${
                  voteStatus === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-green-600 hover:bg-green-50"
                }`}
                aria-label="Upvote"
              >
                <FaChevronUp size={20} />
              </button>

              <span className="font-medium my-1 min-w-[20px] text-center">
                {netVotes}
              </span>

              <button
                disabled={!currentUser}
                onClick={handleDownvote}
                className={`p-2 rounded-full transition ${
                  voteStatus === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-red-600 hover:bg-red-50"
                }`}
                aria-label="Downvote"
              >
                <FaChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>

          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-1.5 flex items-center gap-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              <RiSendPlaneFill /> Post
            </button>
          </div>

          {/* Comment List */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-300 rounded p-3 text-sm text-gray-700 space-y-2"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <strong>{comment.author}</strong>
                  <p>
                    {/* {setScore(10)} */}
                    {score >= 100 ? (
                      <div className="flex items-center">
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                      </div>
                    ) : score >= 80 ? (
                      <div className="flex items-center">
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                      </div>
                    ) : score >= 60 ? (
                      <div className="flex items-center">
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                      </div>
                    ) : score >= 40 ? (
                      <div className="flex items-center">
                        <FaStar className="text-amber-400" />
                        <FaStar className="text-amber-400" />
                      </div>
                    ) : score >= 20 ? (
                      <div className="flex items-center">
                        <FaStar className="text-amber-400" />
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                  {/* {score >= 30 ? "Good"} */}
                </div>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>
              <p>{comment.content}</p>

              <div className="flex gap-2 justify-end items-center">
                {currentUser?.id === idea.founderId?.id && (
                  <button
                    onClick={() => {
                      setTargetId(comment.id);
                      setTargetType("comment");
                      setShowModal(true);
                    }}
                    className="mt-3 text-sm text-blue-600 px-3 py-1 rounded "
                  >
                    Request Meeting
                  </button>
                )}
                <button
                  className="p-1.5 rounded-full bg-gray-100 text-green-600 hover:bg-green-50"
                  aria-label="upvote"
                  onClick={() => handleCommentVote(comment.id, 1)}
                >
                  <FaChevronUp size={16} />
                </button>
                <span className="text-green-600 text-sm font-medium">
                  {comment.upvotes}
                </span>
                <button
                  className="p-1.5 rounded-full bg-gray-100 text-red-600 hover:bg-red-50"
                  aria-label="downvote"
                  onClick={() => handleCommentVote(comment.id, -1)}
                >
                  <FaChevronDown size={16} />
                </button>
                <span className="text-red-600 text-sm font-medium">
                  {comment.downvotes}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Request Meeting Modal */}
        <RequestMeetingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitMeeting}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}
