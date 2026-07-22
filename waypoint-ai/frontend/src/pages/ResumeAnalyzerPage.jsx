import { useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Loader2,
  Copy,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ResumeAnalyzerPage() {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    if (!resume.trim()) {
      toast.error("Please paste your resume.");
      return;
    }

    if (resume.trim().length < 100) {
      toast.error("Resume is too short.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/resume-analyzer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.feedback || "");
      toast.success("Resume analyzed successfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setResume("");
    setResult("");
    toast.success("Cleared");
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="mt-3 text-blue-100 text-lg">
          Paste your resume and receive ATS score, strengths,
          weaknesses and AI suggestions.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3">
              <Upload className="text-blue-600" />
              <h2 className="text-2xl font-bold">
                Resume Input
              </h2>
            </div>

            <button
              onClick={clearAll}
              className="text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={18} />
              Clear
            </button>

          </div>

          <textarea
            rows={18}
            value={resume}
            maxLength={15000}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your complete resume here..."
            className="w-full rounded-xl border p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="text-right text-sm text-gray-500 mt-2">
            {resume.length} / 15000
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-60 transition flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze Resume
              </>
            )}
          </button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3">
              <FileText className="text-green-600" />
              <h2 className="text-2xl font-bold">
                AI Analysis
              </h2>
            </div>

            {result && (
              <button
                onClick={copyResult}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Copy size={18} />
                Copy
              </button>
            )}

          </div>

          {!loading && !result && (
            <div className="h-[500px] flex flex-col justify-center items-center text-center text-gray-400">

              <CheckCircle size={70} />

              <p className="mt-5 text-lg">
                Your AI analysis will appear here.
              </p>

            </div>
          )}

          {loading && (
            <div className="h-[500px] flex justify-center items-center">

              <Loader2
                className="animate-spin text-blue-600"
                size={55}
              />

            </div>
          )}

          {result && (
            <div className="whitespace-pre-wrap overflow-y-auto h-[500px] border rounded-xl p-5 bg-gray-50 leading-7">
              {result}
            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}

export default ResumeAnalyzerPage;