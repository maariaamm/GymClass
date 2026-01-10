import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import EditUserModal from "../components/EditUserModal";
import CreateModal from "../components/CreateModal";
import EditClassModal from "../components/EditClassModal";
import "./AdminDashboard.css";
import CreateClassModal from "../components/CreateClassModal";
import ClassModal from "../components/ClassModal";
import ShowUserModal from "../components/ShowUserModal";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserBookings, setSelectedUserBookings] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, classesRes] = await Promise.all([
          api.get("/auth"),
          api.get("/classes"),
        ]);
        setUsers(usersRes.data);
        setClasses(classesRes.data);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (user?.role === "admin") fetchData();
  }, [user]);

  const fetchUserBookings = async (userId) => {
    try {
      const res = await api.get(`/bookings/user/${userId}`);
      setSelectedUserBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch user bookings:", err);
      setSelectedUserBookings([]);
    }
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    fetchUserBookings(user._id);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/auth/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const deleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      await api.delete(`/classes/${id}`);
      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete class");
    }
  };

  if (loading)
    return <p style={{ padding: "3rem" }}>Loading admin dashboard...</p>;

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <div className="admin-stats">
          <div className="stat-card">
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
          <div className="stat-card">
            <span>Total Classes</span>
            <h2>{classes.length}</h2>
          </div>
        </div>

        {/* USERS */}
        <div className="admin-sections">
          <div className="admin-section-card">
            <h3>
              All Users
              <div className="admin-actions">
                <button
                  className="create-btn"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create User +
                </button>
              </div>
            </h3>
            {users.length === 0 ? (
              <p className="admin-empty">No users found</p>
            ) : (
              <ul className="admin-list">
                {users.map((u) => (
                  <li key={u._id}>
                    <span>{u.name}</span>
                    <div className="admin-actions">
                      <button className="view-user" onClick={() => viewUser(u)}>
                        View User
                      </button>
                      <button
                        className="edit"
                        onClick={() => {
                          setEditingUser(u);
                          setShowEditUserModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteUser(u._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CLASSES */}
          <div className="admin-section-card">
            <h3>
              All Classes
              <div className="admin-actions">
                <button
                  className="create-btn"
                  onClick={() => setShowCreateClassModal(true)}
                >
                  Create Class +
                </button>
              </div>
            </h3>
            {classes.length === 0 ? (
              <p className="admin-empty">No classes created yet</p>
            ) : (
              <ul className="admin-list">
                {classes.map((c) => (
                  <li key={c._id}>
                    <span>{c.title}</span>
                    <div className="admin-actions">
                      <button
                        className="View-Class"
                        onClick={() => setSelectedClass(c)}
                      >
                        View Class
                      </button>
                      <button
                        className="edit"
                        onClick={() => {
                          setEditingClass(c);
                          setShowEditClassModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteClass(c._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showEditUserModal && (
        <EditUserModal
          userData={editingUser}
          onClose={() => setShowEditUserModal(false)}
          onSave={(updatedUser) =>
            setUsers((prev) =>
              prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
            )
          }
        />
      )}

      {showEditClassModal && (
        <EditClassModal
          classData={editingClass}
          onClose={() => setShowEditClassModal(false)}
          onSave={(updatedClass) =>
            setClasses((prev) =>
              prev.map((c) => (c._id === updatedClass._id ? updatedClass : c))
            )
          }
        />
      )}

      {showCreateModal && (
        <CreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(newUser) => setUsers((prev) => [...prev, newUser])}
        />
      )}

      {showCreateClassModal && (
        <CreateClassModal
          onClose={() => setShowCreateClassModal(false)}
          onCreate={(newClass) => setClasses((prev) => [...prev, newClass])}
        />
      )}

      {selectedClass && (
        <ClassModal
          gymClass={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}

      {selectedUser && (
        <ShowUserModal
          user={selectedUser}
          bookings={selectedUserBookings}
          onClose={() => {
            setSelectedUser(null);
            setSelectedUserBookings([]);
          }}
        />
      )}
    </>
  );
}

export default AdminDashboard;
