import "./ClassModal.css";

function ClassModal({ gymClass, onClose }) {
  if (!gymClass) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {gymClass.imageUrl && (
          <img
            src={gymClass.imageUrl}
            alt={gymClass.title}
            className="modal-image"
          />
        )}

        <h2>{gymClass.title}</h2>
        <p className="modal-description">{gymClass.description}</p>

        <div className="modal-info">
          <p>
            <strong>Category:</strong> {gymClass.category}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {gymClass.date
              ? new Date(gymClass.date).toLocaleDateString("sv-SE")
              : "-"}
          </p>
          <p>
            <strong>Time:</strong> {gymClass.time || "-"}
          </p>
          <p>
            <strong>Trainer:</strong> {gymClass.trainer || "-"}
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default ClassModal;
