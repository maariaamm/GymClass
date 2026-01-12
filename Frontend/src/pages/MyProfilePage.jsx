import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./MyProfilePage.css";

function MyProfilePage() {
  const { user, setUserProfile } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/me");
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    }

    if (user) fetchProfile();
  }, [user]);

  // Fetch user's bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await api.get("/bookings/my");

        // Sort by date ascending

        const sortedBookings = res.data.sort(
          (a, b) => new Date(a.classId.date) - new Date(b.classId.date)
        );
        setBookings(sortedBookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    }

    if (user) fetchBookings();
  }, [user]);

  // Password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await api.put(`/auth/${user.id}`, { password });
      alert("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  // Profile image upload
  const handleProfileImageUpload = async (e) => {
    e.preventDefault();
    if (!profileImageFile) return;

    const formData = new FormData();
    formData.append("profileImage", profileImageFile);

    try {
      const res = await api.put(`/auth/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile image updated!");
      setCurrentUser(res.data);
      if (setUserProfile) setUserProfile(res.data);
      setProfileImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  if (!user) return <p>Sign in to see your profile..</p>;
  if (!currentUser) return <p>Profile loading...</p>;

  return (
    <div className="my-profile-page">
      <Navbar />

      <div className="profile-container">
        <div className="profile-image-section">
          <img
            src={
              currentUser.profileImage
                ? `${process.env.REACT_APP_API_URL}${currentUser.profileImage}`
                : "/default-avatar.avif"
            }
            alt={currentUser.name || "Profile"}
            className="profile-image"
            onError={(e) => {
              e.target.src = "/default-avatar.avif";
            }}
          />
          <p className="profile-quote">
            "Train hard, stay consistent, and enjoy the journey!"
          </p>
        </div>

        <div className="profile-info-section">
          <h1>My Profile ✨</h1>
          <p>
            <strong>Name:</strong> {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Booked Classes:</strong> {bookings.length}
          </p>

          {bookings.length > 0 && (
            <div className="bookings-summary">
              <h2>Upcoming Classes 🏋🏼</h2>
              <ul>
                {bookings.map((b) => (
                  <li key={b._id}>
                    {b.classId.title} –{" "}
                    {new Date(b.classId.date).toLocaleDateString("sv-SE")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Change password */}
          <form className="password-form" onSubmit={handlePasswordChange}>
            <h2>Change Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>
          </form>

          {/* Upload profile image */}
          <form
            className="image-upload-form"
            onSubmit={handleProfileImageUpload}
          >
            <h2>Update Profile Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImageFile(e.target.files[0])}
            />
            <button type="submit">Click here to Upload Image</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
