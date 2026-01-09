import React, { useState } from "react";
import api from "../services/api";
import "./CreateModal.css";

const CreateClassModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    trainer: "",
    date: "",
    time: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/classes", {
        ...formData,
      });

      onCreate(res.data);
      onClose();
    } catch (err) {
      console.error("Failed to create class:", err);
      alert("Failed to create class");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create Class</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Trainer
            <input
              type="text"
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
            />
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>

          <label>
            Time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>

          <label>
            Image URL
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
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

export default CreateClassModal;
