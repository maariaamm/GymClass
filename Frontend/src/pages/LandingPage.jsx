import React from "react";
import Navbar from "../components/Navbar.jsx";
import frontpage from "../assets/front-page.jpg";
import yoga from "../assets/yoga.png";
import cardio from "../assets/cardio.avif";
import strength from "../assets/strength.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <img src={frontpage} alt="Gym" />
        <div className="hero-overlay">
          <h1>Welcome to GymClass</h1>
          <p>Log in to book your favorite fitness classes and stay in shape!</p>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <div className="landing-page">
        <section className="info">
          <div className="info-card">
            <img src={yoga} alt="yoga" />
            <h2>Yoga Classes</h2>
            <p>Relax and improve flexibility with our expert trainers.</p>
          </div>

          <div className="info-card">
            <img src={cardio} alt="cardio" />
            <h2>Cardio Workouts</h2>
            <p>Boost your stamina and burn calories.</p>
          </div>

          <div className="info-card">
            <img src={strength} alt="strength" />
            <h2>Strength Training</h2>
            <p>Build muscle with guided sessions.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
