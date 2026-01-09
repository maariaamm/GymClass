import React, { useState } from "react";
import api from "../services/api";
import "./EditClassModal.css";

function EditClassModal({ classData, onClose, onSave }) {
  const [title, setTitle] = useState(classData.title || "");
  const [description, setDescription] = useState(classData.description || "");
  const [category, setCategory] = useState(classData.category || "");
  const [time, setTime] = useState(classData.time || "");
  const [date, setDate] = useState(classData.date?.slice(0, 16) || "");
  const [trainer, setTrainer] = useState(classData.trainer || "");
  const [imageUrl, setImageUrl] = useState(classData.imageUrl || "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put(`/classes/${classData._id}`, {
        title,
        description,
        trainer,
        category,
        time,
        date,
        imageUrl,
      });
      onSave(res.data);
      onClose();
    } catch (err) {
      alert("Failed to update class");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="edit-class-modal">
        <h2>Edit Class</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Trainer</label>
          <input
            type="text"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            required
          />

          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <label>Date </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label>Time </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>upload image</label>
          <input
            type="string"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClassModal;
