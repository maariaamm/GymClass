import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ClassModal from "../components/ClassModal";
import "./MyBookingsPage.css";

function MyBookingsPage() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch all bookings for logged in user
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchBookings();
  }, [user]);

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await api.delete(`/bookings/${bookingId}`);
      alert("Booking cancelled");

      // Remove cancelled booking from state
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (!user) return <p>Please log in to see your bookings.</p>;
  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="my-bookings-page">
      <Navbar />

      <h1>My Booked Classes</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => {
            const c = b.classId;
            return (
              <div
                key={b._id}
                className="booking-card"
                onClick={() => setSelectedClass(c)}
              >
                <h3>{c.title}</h3>

                {c.imageUrl && (
                  <img src={c.imageUrl} alt={c.title} className="class-image" />
                )}

                <p>{c.description}</p>
                <p>Category: {c.category}</p>
                <p>Trainer: {c.trainer}</p>

                <p>
                  Date:{" "}
                  {new Date(c.date).toLocaleString("sv-SE", {
                    timeZone: "Europe/Stockholm",
                  })}
                </p>

                {/* Cancel booking button */}
                <button
                  className="cancel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelBooking(b._id);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedClass && (
        <ClassModal
          gymClass={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}

export default MyBookingsPage;
