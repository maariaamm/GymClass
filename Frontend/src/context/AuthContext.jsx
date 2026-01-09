import { createContext, useState, useEffect } from "react";
import api, { setToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (loginResponse) => {
    const { token, user: u } = loginResponse;

    const normalizedUser = {
      id: u.id || u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      profileImage: u.profileImage || null,
    };

    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(null);
  };

  const updateProfile = async ({ password, profileImageFile }) => {
    if (!user) throw new Error("No user logged in");

    const formData = new FormData();
    if (password) formData.append("password", password);
    if (profileImageFile) formData.append("profileImage", profileImageFile);

    const res = await api.put(`/auth/${user.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updatedUser = {
      id: res.data._id,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role,
      profileImage: res.data.profileImage || null,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
