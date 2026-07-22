// src/pages/InterviewPrepPage.jsx

import { useState } from "react";
import {
  Briefcase,
  Sparkles,
  Loader2,
  Copy,
  MessageCircleQuestion,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function InterviewPrepPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generateQuestions = async () => {
    if (!role.trim() || !experience.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/interview-prep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          experience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate interview questions");
      }

      setResult(data.questions || "");
      toast.success("Interview questions generated!");
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
        className="rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          AI Interview Preparation
        </h1>

        <p className="mt-3 text-orange-100 text-lg">
          Generate personalized interview questions and answers based on your target role.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-orange-600" />
            <h2 className="text-2xl font-bold">
              Interview Details
            </h2>
          </div>

          <label className="font-medium text-gray-700">
            Target Role
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Example: Frontend Developer"
            className="mt-2 w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-orange-500"
          />

          <label className="font-medium text-gray-700 mt-5 block">
            Experience
          </label>

          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Example: Fresher / 2 Years"
            className="mt-2 w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Questions
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
              <MessageCircleQuestion className="text-orange-600" />
              <h2 className="text-2xl font-bold">
                AI Questions
              </h2>
            </div>

            {result && (
              <button
                onClick={copyResult}
                className="text-orange-600 flex items-center gap-2"
              >
                <Copy size={18} />
                Copy
              </button>
            )}

          </div>

          {!loading && !result && (
            <div className="h-[500px] flex justify-center items-center text-center text-gray-400 text-lg">
              AI-generated interview questions will appear here.
            </div>
          )}

          {loading && (
            <div className="h-[500px] flex justify-center items-center">
              <Loader2
                className="animate-spin text-orange-600"
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

export default InterviewPrepPage;