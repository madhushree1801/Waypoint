// src/pages/SkillGapPage.jsx

import { useState } from "react";
import {
  Brain,
  Sparkles,
  Loader2,
  Copy,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function SkillGapPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const analyzeSkills = async () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/skill-gap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        jobTitle: targetRole,
          skills: currentSkills,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.analysis || "");
      toast.success("Skill analysis completed!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied");
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          AI Skill Gap Analysis
        </h1>

        <p className="mt-3 text-purple-100 text-lg">
          Compare your current skills with your dream role and discover what to learn next.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-purple-600" />
            <h2 className="text-2xl font-bold">
              Your Details
            </h2>
          </div>

          <label className="font-medium text-gray-700">
            Current Skills
          </label>

          <textarea
            rows={8}
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="Example: HTML, CSS, JavaScript, React..."
            className="mt-2 w-full rounded-xl border p-4 resize-none outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="font-medium text-gray-700 mt-5 block">
            Target Role
          </label>

          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Example: Full Stack Developer"
            className="mt-2 w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={analyzeSkills}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze Skills
              </>
            )}
          </button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-6">

            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-600" />
              <h2 className="text-2xl font-bold">
                AI Report
              </h2>
            </div>

            {result && (
              <button
                onClick={copyResult}
                className="text-purple-600 flex items-center gap-2"
              >
                <Copy size={18} />
                Copy
              </button>
            )}

          </div>

          {!loading && !result && (
            <div className="h-[500px] flex items-center justify-center text-center text-gray-400 text-lg">
              Skill gap analysis will appear here.
            </div>
          )}

          {loading && (
            <div className="h-[500px] flex justify-center items-center">
              <Loader2
                className="animate-spin text-purple-600"
                size={50}
              />
            </div>
          )}

          {result && (
            <div className="h-[500px] overflow-y-auto whitespace-pre-wrap rounded-xl border bg-gray-50 p-5">
              {result}
            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}

export default SkillGapPage;