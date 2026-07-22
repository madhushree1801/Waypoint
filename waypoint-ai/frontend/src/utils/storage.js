// src/utils/storage.js
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
export const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

export const getSession = () => JSON.parse(localStorage.getItem("session")) || null;
export const saveSession = (user) => localStorage.setItem("session", JSON.stringify(user));
export const clearSession = () => localStorage.removeItem("session");

export const getDashboardData = () =>
  JSON.parse(localStorage.getItem("dashboardData")) || {
    resumeAnalyses: 0,
    roadmapsCreated: 0,
    skillAnalyses: 0,
    interviewsTaken: 0,
    chatQuestions: 0,
    recentActivity: []
  };

export const saveDashboardData = (data) =>
  localStorage.setItem("dashboardData", JSON.stringify(data));
