import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./CreateModal.css";

const CreateModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    profileImage: null,
  });

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      profileImage: null,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const res = await api.post("/auth/register", data);
      onCreate(res.data.user);
      onClose();
    } catch (err) {
      console.error("Failed to create user:", err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>

          <label>
            Role
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>
            Profile Image
            <input type="file" name="profileImage" onChange={handleChange} />
          </label>

          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
