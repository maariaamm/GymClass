import React from "react";
import "./ClassModal.css";

const ShowUserModal = ({ user, bookings, onClose }) => {
  if (!user) return null;

  const bookedClasses = bookings?.map((b) => b.classId) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Profile</h2>

        {user.profileImage && (
          <img
            src={`${
              user.profileImage
                ? `https://gymclass.onrender.com${user.profileImage}`
                : "https://gymclass.onrender.com/uploads/profileImages/default.avif"
            }`}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "1rem",
            }}
            alt={user.name}
          />
        )}

        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Account Created at:</strong> {user.createdAt}
        </p>

        <hr />

        <h3>Booked Classes</h3>

        {bookedClasses.length === 0 ? (
          <p>This user has no booked classes.</p>
        ) : (
          <ul style={{ paddingLeft: "1rem" }}>
            {bookedClasses.map((b) => (
              <li key={b._id} style={{ marginBottom: "0.5rem" }}>
                <strong>{b.title}</strong>
                {b.date && (
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {new Date(b.date).toLocaleDateString("sv-SE")}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ShowUserModal;
