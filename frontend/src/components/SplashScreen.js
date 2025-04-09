import React from "react";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo-text">TRADEX</h1>
      </header>
      <div className="illustration-container">
          <img
            src="/illustration.avif"
            alt="Illustration"
            className="illustrations"
          />
        </div>

      

      {/* Bottom Section */}
      <div className="bottom-section">
      
        <h2>Everything you need in go</h2>
        <p>
          Easily buy & sell products, find jobs, and discover local services
          all in one app!
        </p>
        <button className="get-started-btn">Get started</button>
      </div>
    </div>
  );
};

export default SplashScreen;