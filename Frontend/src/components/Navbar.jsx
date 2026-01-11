import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./Navbar.css";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 1) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(`/classes?search=${search}`);
        setSuggestions(res.data.slice(0, 5));
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    fetchSuggestions();
  }, [search]);

  const handleSelect = (value) => {
    setSearch(value);
    setSuggestions([]);
    navigate(`/classesPage?search=${value}`);
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Nav LOGO */}
        <div className="nav-logo">
          <Link to="/">GymClass</Link>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          {" "}
          {user && !isAdmin && <Link to="/">Home</Link>}
          <Link to="/classesPage">Classes</Link>
          {user && !isAdmin && <Link to="/myBookings">My Booked Classes</Link>}
          {user && <Link to="/myProfilePage">My Profile</Link>}
          {/* ADMIN ONLY */}
          {isAdmin && (
            <>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </>
          )}
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* SEARCH */}
        <div className="nav-search-wrapper">
          <input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="search-dropdown">
              {suggestions.map((c) => (
                <li key={c._id} onClick={() => handleSelect(c.title)}>
                  {c.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
