// src/layouts/SidebarLayout.jsx

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Map,
  Brain,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function SidebarLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Resume Analyzer",
      icon: <FileText size={20} />,
      path: "/dashboard/resume-analyzer",
    },
    {
      name: "Career Roadmap",
      icon: <Map size={20} />,
      path: "/dashboard/career-roadmap",
    },
    {
      name: "Skill Gap",
      icon: <Brain size={20} />,
      path: "/dashboard/skill-gap",
    },
    {
      name: "Interview Prep",
      icon: <Briefcase size={20} />,
      path: "/dashboard/interview-prep",
    },
    {
      name: "AI Career Chat",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/career-chat",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const Sidebar = () => (
    <div className="w-72 h-full bg-white shadow-2xl flex flex-col">

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Waypoint AI
            </h1>

            <p className="text-blue-100 text-sm">
              Career Assistant
            </p>
          </div>

        </div>

      </div>

      <div className="px-5 py-6 border-b">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>

            <h2 className="font-bold text-gray-800">
              {user?.name}
            </h2>

            <p className="text-sm text-gray-500 break-all">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>

        ))}

      </nav>

      <div className="p-5 border-t">

        <button
          onClick={() => setShowLogout(true)}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="lg:hidden bg-white shadow flex justify-between items-center p-4">

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>

        <h1 className="font-bold text-xl text-blue-600">
          Waypoint AI
        </h1>

      </div>

      <div className="flex">

        <aside className="hidden lg:block fixed left-0 top-0 h-screen">
          <Sidebar />
        </aside>

        <AnimatePresence>

          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />

              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className="fixed left-0 top-0 h-full z-50 lg:hidden"
              >
                <div className="relative">

                  <Sidebar />

                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-white"
                  >
                    <X />
                  </button>

                </div>
              </motion.div>
            </>
          )}

        </AnimatePresence>

        <main className="flex-1 lg:ml-72 p-8">
          <Outlet />
        </main>

      </div>

      <AnimatePresence>

        {showLogout && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              initial={{ scale: .8 }}
              animate={{ scale: 1 }}
              exit={{ scale: .8 }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-md"
            >

              <h2 className="text-2xl font-bold">
                Logout?
              </h2>

              <p className="text-gray-500 mt-3">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={() => setShowLogout(false)}
                  className="px-5 py-2 rounded-xl bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white"
                >
                  Logout
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default SidebarLayout;