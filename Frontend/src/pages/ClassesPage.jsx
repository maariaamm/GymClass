import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./ClassesPage.css";
import ClassModal from "../components/ClassModal";

function ClassesPage() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  // FETCH ALL CLASSES

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        const search = params.get("search") || "";

        const res = await api.get(`/classes?search=${search}`);
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, [location.search]);

  const bookClass = async (classId) => {
    try {
      await api.post("/bookings", { classId });
      alert("Class booked successfully!");

      const params = new URLSearchParams(location.search);
      const search = params.get("search") || "";
      const res = await api.get(`/classes?search=${search}`);
      setClasses(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <p>Loading classes...</p>;

  return (
    <>
      <Navbar />

      <div className="classes-page">
        <h1>Available Gym Classes!</h1>

        <div className="classes-list">
          {classes.map((c) => {
            return (
              <div
                key={c._id}
                className="class-card"
                onClick={() => setSelectedClass(c)}
              >
                <h3>{c.title}</h3>

                {c.imageUrl && (
                  <img src={c.imageUrl} alt={c.title} className="class-image" />
                )}

                <p>
                  <strong>{c.description}</strong>
                </p>
                <p>
                  <strong>Category:</strong>
                  {c.category}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {c.date ? new Date(c.date).toLocaleDateString("sv-SE") : "-"}
                </p>
                <p>
                  <strong>Time:</strong>
                  {c.time}
                </p>
                <p>
                  <strong>Trainer:</strong>
                  {c.trainer}
                </p>
                {user ? (
                  <button
                    className="book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      bookClass(c._id);
                    }}
                  >
                    Book
                  </button>
                ) : (
                  <p className="login-text">Login to book</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <ClassModal
        gymClass={selectedClass}
        onClose={() => setSelectedClass(null)}
      />
    </>
  );
}

export default ClassesPage;
