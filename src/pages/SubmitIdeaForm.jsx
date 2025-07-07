import { useState } from "react";
import { SubmitIdea } from "../public/ExporImage";
import { useNavigate } from "react-router";
import { submitIdea } from "../services/ideas.service";

export default function SubmitIdeaForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mvpLink: "",
    category: "",
    country: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await submitIdea(formData);
      navigate("/MyIdeas");
    } catch (err) {
      console.error("Failed to submit idea", err);
      setError("Failed to submit idea");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center min-h-screen min-w-screen">
        <div className="flex flex-col justify-around items-center p-5 rounded-lg w-250 ">
          <div className="flex flex-col h-25 justify-center items-center mb-4">
            <p className="text-4xl font-bold m-3">Draw Your Startup Idea</p>
            <p className="text-sm font-medium text-gray-500">
              Share your innovative idea with our community and get valuable
              feedback from potential investors.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center  w-full gap-5"
          >
            <div>
              <img src={SubmitIdea} alt="" className=" w-200" />
            </div>
            {/* idea title */}
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col gap-1">
                <label className=" font-medium">
                  Idea Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  placeholder="Enter your idea title"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  maxLength="1000"
                  required
                  placeholder="Minimum 1000 characters"
                ></textarea>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">MVP/Demo Link</label>
                <input
                  name="mvpLink"
                  value={formData.mvpLink}
                  onChange={handleChange}
                  type="text"
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  placeholder="https://your-demo-link.com"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  required
                >
                  <option value="">-- Select Industry --</option>
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Environment">Environment</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Social Impact">Social Impact</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Gaming">Gaming</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="country"
                  className="text-sm font-semibold text-gray-700"
                >
                  Target Market <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  required
                >
                  <option value="">Select a country...</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="py-3">
                <button
                  type="submit"
                  className="font-medium py-2 w-full rounded-sm text-white bg-[#1E40AF]"
                >
                  Submit Idea
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
