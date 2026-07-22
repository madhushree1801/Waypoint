import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("waypoint-user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("waypoint-user");
      }
    }

    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const users =
      JSON.parse(localStorage.getItem("waypoint-users")) || [];

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password.trim()) {
      throw new Error("All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      throw new Error("Invalid email address.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("Email already registered.");
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "waypoint-users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "waypoint-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const login = (email, password) => {
    const users =
      JSON.parse(localStorage.getItem("waypoint-users")) || [];

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      throw new Error("Email and password are required.");
    }

    const existingUser = users.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        u.password === password
    );

    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }

    localStorage.setItem(
      "waypoint-user",
      JSON.stringify(existingUser)
    );

    setUser(existingUser);
  };

  const logout = () => {
    localStorage.removeItem("waypoint-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}