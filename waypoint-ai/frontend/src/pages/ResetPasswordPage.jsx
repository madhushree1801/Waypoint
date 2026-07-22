import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const email = localStorage.getItem("reset-email");

  useEffect(() => {
    if (!email) {
      toast.error("Unauthorized access.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.trim().length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("waypoint-users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, password }
        : user
    );

    localStorage.setItem(
      "waypoint-users",
      JSON.stringify(updatedUsers)
    );

    localStorage.removeItem("reset-email");

    toast.success("Password updated successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex justify-center items-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10"
      >

        <h2 className="text-3xl font-bold text-center">
          Reset Password
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Create a new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8"
        >

          {/* Password */}

          <div className="relative">

            <Lock className="absolute left-4 top-4 text-gray-400"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="button"
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

          </div>

          {/* Confirm */}

          <div className="relative">

            <Lock className="absolute left-4 top-4 text-gray-400"/>

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="button"
              onClick={()=>setShowConfirm(!showConfirm)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
          >
            Update Password
          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default ResetPasswordPage;