import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchCommentsByIdeaId = async (ideaId) => {
  const res = await axios.get(`${API}/comments/idea/${ideaId}`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const postComment = async (ideaId, text) => {
  const res = await axios.post(
    `${API}/comments/idea/${ideaId}`,
    { ideaId, text },
    { withCredentials: true }
  );
  return res.data.data;
};

export const voteOnComment = async ({ commentId, ideaId, vote, userId }) => {
  const res = await axios.post(
    `${API}/comments/vote`,
    {
      commentId,
      ideaId,
      vote,
      userId,
    },
    { withCredentials: true }
  );

  return res.data;
};
