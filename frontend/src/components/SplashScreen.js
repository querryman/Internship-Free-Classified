import React from "react";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo-text">TRADEX</h1>
      </header>

      <div className="content">
        {/* Bottom Section - includes image + text */}
        <div className="bottom-section">
          <div className="illustration-container">
            <img
              src="/illustration.avif"
              alt="Illustration"
              className="illustration"
            />
          </div>
          <div className="text-container">
            <h2>Everything you <br /> need in one go</h2>
            <p>
              Easily buy & sell products, find jobs, and discover local services
              all in one app!
            </p>
            <button className="get-started-btn">Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;