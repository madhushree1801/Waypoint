import { useState } from "react";
import {
  Map,
  Sparkles,
  Loader2,
  Copy,
  Milestone,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function CareerRoadmapPage() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generateRoadmap = async () => {
    if (!goal.trim()) {
      toast.error("Please enter your career goal.");
      return;
    }

    if (goal.trim().length < 3) {
      toast.error("Enter a valid career goal.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/career-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate roadmap");
      }

      setResult(data.roadmap || "");
      toast.success("Roadmap generated successfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyRoadmap = async () => {
    await navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setGoal("");
    setResult("");
    toast.success("Cleared");
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          AI Career Roadmap
        </h1>

        <p className="mt-3 text-green-100 text-lg">
          Generate a personalized learning roadmap for your dream career.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3">
              <Map className="text-green-600" />
              <h2 className="text-2xl font-bold">
                Career Goal
              </h2>
            </div>

            <button
              onClick={clearAll}
              className="text-red-500 flex items-center gap-1"
            >
              <Trash2 size={18} />
              Clear
            </button>

          </div>

          <input
            type="text"
            value={goal}
            maxLength={100}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Example: Full Stack Developer"
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="text-right text-sm text-gray-500 mt-2">
            {goal.length} / 100
          </div>

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-white font-semibold flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Roadmap
              </>
            )}
          </button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3">
              <Milestone className="text-green-600" />
              <h2 className="text-2xl font-bold">
                AI Roadmap
              </h2>
            </div>

            {result && (
              <button
                onClick={copyRoadmap}
                className="text-green-600 flex items-center gap-2"
              >
                <Copy size={18} />
                Copy
              </button>
            )}

          </div>

          {!loading && !result && (
            <div className="h-[500px] flex items-center justify-center text-gray-400 text-lg">
              Your roadmap will appear here.
            </div>
          )}

          {loading && (
            <div className="h-[500px] flex justify-center items-center">
              <Loader2
                className="animate-spin text-green-600"
                size={55}
              />
            </div>
          )}

          {result && (
            <div className="h-[500px] overflow-y-auto whitespace-pre-wrap rounded-xl border bg-gray-50 p-5 leading-7">
              {result}
            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}

export default CareerRoadmapPage;