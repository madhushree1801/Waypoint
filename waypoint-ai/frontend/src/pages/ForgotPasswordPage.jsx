// src/pages/ForgotPasswordPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (!email || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("waypoint-users")) || [];

    const index = users.findIndex((u) => u.email === email);

    if (index === -1) {
      toast.error("Account not found");
      return;
    }

    users[index].password = newPassword;

    localStorage.setItem(
      "waypoint-users",
      JSON.stringify(users)
    );

    toast.success("Password updated successfully");

    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center p-5">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8"
      >

        <div className="text-center mb-8">

          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">

            <ShieldCheck size={36} />

          </div>

          <h1 className="text-3xl font-bold mt-5">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Reset your account password
          </p>

        </div>

        <div className="space-y-5">

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition"
          >
            Reset Password
          </button>

        </div>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-8 text-blue-600 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

      </motion.div>

    </div>
  );
}

export default ForgotPasswordPage;