import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      toast.success("Account created successfully");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
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

          <p className="text-xl text-blue-100">
            Start your AI-powered career journey today.
          </p>

          <div className="mt-10 space-y-5 text-lg">
            <div>🚀 Personalized Career Roadmaps</div>
            <div>📄 Resume Analysis</div>
            <div>📊 Skill Gap Detection</div>
            <div>💼 Interview Preparation</div>
            <div>🤖 AI Career Mentor</div>
          </div>

          <div className="mt-14 text-blue-200 text-sm">
            Join thousands of learners building successful careers.
          </div>

        </div>

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-3">
            Join Waypoint AI and build your future.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
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

            </div>

            <div>

              <label className="font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-blue-600"
                >
                  {showConfirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default RegisterPage;