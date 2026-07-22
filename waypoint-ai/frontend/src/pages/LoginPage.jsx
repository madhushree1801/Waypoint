import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2"
      >

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-14">

          <h1 className="text-5xl font-extrabold mb-6">
            Waypoint AI
          </h1>

          <p className="text-xl leading-8 text-blue-100">
            Your AI-powered career companion.
          </p>

          <div className="mt-10 space-y-5 text-lg">
            <div>✅ Resume Analysis</div>
            <div>✅ Career Roadmaps</div>
            <div>✅ Skill Gap Detection</div>
            <div>✅ Interview Preparation</div>
            <div>✅ AI Career Mentor</div>
          </div>

          <div className="mt-14 text-blue-200 text-sm">
            Build your future with intelligent career guidance.
          </div>

        </div>

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-3">
            Login to continue your career journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default LoginPage;