import { Link } from "react-router-dom";
import {
  FileText,
  Map,
  Brain,
  MessageSquare,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      title: "Resume Analyzer",
      description:
        "Analyze your resume with AI and receive ATS score, strengths, weaknesses, and improvements.",
      icon: <FileText size={30} />,
      color: "from-blue-500 to-cyan-500",
      link: "/dashboard/resume-analyzer",
    },
    {
      title: "Career Roadmap",
      description:
        "Generate a personalized learning roadmap based on your dream career.",
      icon: <Map size={30} />,
      color: "from-green-500 to-emerald-500",
      link: "/dashboard/career-roadmap",
    },
    {
      title: "Skill Gap Analysis",
      description:
        "Identify missing skills and prioritize what to learn next.",
      icon: <Brain size={30} />,
      color: "from-purple-500 to-pink-500",
      link: "/dashboard/skill-gap",
    },
    {
      title: "Interview Prep",
      description:
        "Practice AI-generated interview questions with model answers.",
      icon: <Briefcase size={30} />,
      color: "from-orange-500 to-red-500",
      link: "/dashboard/interview-prep",
    },
    {
      title: "AI Career Chat",
      description:
        "Ask career questions and receive personalized AI guidance.",
      icon: <MessageSquare size={30} />,
      color: "from-indigo-500 to-violet-500",
      link: "/dashboard/career-chat",
    },
  ];

  const stats = [
    {
      title: "Resume Score",
      value: "--",
      subtitle: "Analyze a resume",
      icon: <TrendingUp size={24} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Career Goal",
      value: "Not Set",
      subtitle: "Choose your target",
      icon: <Target size={24} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "AI Features",
      value: "5",
      subtitle: "Available",
      icon: <Sparkles size={24} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Last Activity",
      value: "Today",
      subtitle: "Keep learning",
      icon: <Clock size={24} />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <h1 className="text-4xl font-bold">
              Welcome back, {user?.name || "User"} 👋
            </h1>

            <p className="mt-4 text-blue-100 text-lg max-w-2xl">
              Your AI-powered career assistant is ready. Analyze resumes,
              discover missing skills, generate roadmaps, and prepare for
              interviews—all from one place.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

              <Link
                to="/dashboard/resume-analyzer"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                Analyze Resume
              </Link>

              <Link
                to="/dashboard/career-roadmap"
                className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Generate Roadmap
              </Link>

            </div>

          </div>

          <div className="hidden lg:flex items-center justify-center">

            <div className="w-56 h-56 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">

              <Sparkles size={90} />

            </div>

          </div>

        </div>
      </motion.div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {item.value}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {item.subtitle}
                </p>

              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.bg} ${item.text}`}
              >
                {item.icon}
              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Features */}

      <div>

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold text-gray-800">
            AI Career Tools
          </h2>

          <p className="text-gray-500">
            Select a feature to begin
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {cards.map((card, index) => (

            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >

              <Link
                to={card.link}
                className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-md`}
                >
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold mt-6 text-gray-800">
                  {card.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {card.description}
                </p>

                <div className="flex items-center text-blue-600 font-semibold mt-6 group-hover:translate-x-2 transition">

                  Launch Tool

                  <ArrowRight size={18} className="ml-2" />

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Quick Tips */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-5">
          Career Tips
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="font-semibold text-blue-700">
              Resume
            </h3>
            <p className="text-gray-600 mt-2">
              Keep your resume to one page and quantify your achievements.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <h3 className="font-semibold text-green-700">
              Skills
            </h3>
            <p className="text-gray-600 mt-2">
              Learn one high-demand skill deeply instead of many superficially.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <h3 className="font-semibold text-purple-700">
              Interviews
            </h3>
            <p className="text-gray-600 mt-2">
              Practice explaining projects using the STAR method.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;