import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";  
import { fetchIdeaAnalytics, fetchIdeaById } from "../services/ideas.service";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

function aggregateAnalytics(votes) {
  const ageGroupsCount = {
    "18-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45+": 0,
  };
  const genderCount = {};
  const countryCount = {};
  const cityCount = {};
  let upVotes = 0;
  let downVotes = 0;

  votes.forEach((v) => {
    if (v.value === 1) upVotes += 1;
    if (v.value === -1) downVotes += 1;
    if (!v.userId) return;
    const { age, gender, country, city } = v.userId;

    if (typeof age === "number") {
      if (age < 25) ageGroupsCount["18-24"] += 1;
      else if (age < 35) ageGroupsCount["25-34"] += 1;
      else if (age < 45) ageGroupsCount["35-44"] += 1;
      else ageGroupsCount["45+"] += 1;
    }

    if (gender) genderCount[gender] = (genderCount[gender] || 0) + 1;
    if (country) countryCount[country] = (countryCount[country] || 0) + 1;
    if (city) cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const mapToArray = (obj) =>
    Object.keys(obj).map((name) => ({ name, value: obj[name] }));

  return {
    ageGroups: mapToArray(ageGroupsCount).filter((g) => g.value > 0),
    gender: mapToArray(genderCount),
    countries: mapToArray(countryCount),
    cities: mapToArray(cityCount),
    vote: [
      { name: "Up vote", value: upVotes },
      { name: "Down vote", value: downVotes },
    ],
  };
}

export default function IdeaAnalysisPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [ideaRes, analyticsRes] = await Promise.all([
          fetchIdeaById(id),
          fetchIdeaAnalytics(id),
        ]);

        const votes = analyticsRes.data?.idea || analyticsRes.idea || [];
        const demographicData = aggregateAnalytics(votes);
        const ideaData = ideaRes.data || ideaRes;

        setIdea({ ...ideaData, demographicData });
      } catch (err) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [id]);

    if (loading)
    return (
      <div class="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!idea) return <p className="p-6">Idea not found.</p>;

  return (
    <div className="min-h-screen min-w-screen">
      <Link
        to="/MyIdeas"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        <IoIosArrowBack />
        Back
      </Link>
      <div className="mx-auto px-4 md:px-10 py-10 text-[#333]">
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{idea.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {idea.tag}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-md font-semibold mb-4">Demographic Breakdown</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Age Groups */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={idea.demographicData?.ageGroups || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {(idea.demographicData?.ageGroups || []).map((entry, index) => (
                          <Cell key={`cell-age-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vote */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">vote</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={idea.demographicData?.vote || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#ffc658"
                        label
                      >
                        {(idea.demographicData?.vote || []).map((entry, index) => (
                          <Cell key={`cell-vote-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">Gender</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={idea.demographicData?.gender || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                      >
                        {(idea.demographicData?.gender || []).map((entry, index) => (
                          <Cell key={`cell-gender-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">Country</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={idea.demographicData?.countries || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ffc658" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">City</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={idea.demographicData?.cities || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ff7f50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}