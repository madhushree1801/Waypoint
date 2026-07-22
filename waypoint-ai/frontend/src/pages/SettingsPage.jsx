import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  Lock,
  Save,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function SettingsPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSaving(true);

    const users =
      JSON.parse(localStorage.getItem("waypoint-users")) || [];

    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return {
          ...u,
          name: name.trim(),
          password: password || u.password,
        };
      }
      return u;
    });

    const currentUser = updatedUsers.find(
      (u) => u.email === email
    );

    localStorage.setItem(
      "waypoint-users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "waypoint-user",
      JSON.stringify(currentUser)
    );

    toast.success("Profile updated successfully");

    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl text-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          Account Settings
        </h1>

        <p className="mt-3 text-blue-100">
          Manage your profile information and account security.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="flex items-center gap-3 mb-8">

          <ShieldCheck
            size={30}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Profile Information
            </h2>

            <p className="text-gray-500">
              Update your personal details.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-semibold text-gray-700">
              Full Name
            </label>

            <div className="relative mt-2">

              <User
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative mt-2">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                value={email}
                disabled
                className="w-full border rounded-xl pl-12 pr-4 py-3 bg-gray-100 text-gray-500"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              New Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full border rounded-xl pl-12 pr-12 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Re-enter password"
              className="w-full border rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition disabled:opacity-70"
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>

          <div className="flex items-center text-green-600 gap-2 font-medium">
            <CheckCircle size={18} />
            Your account is secure
          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default SettingsPage;