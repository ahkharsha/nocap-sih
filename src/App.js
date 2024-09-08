import React, { useState } from "react";
import { BrowserRoute, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AuthSection from "./Components/AuthSection";
import CaptchaSection from "./Components/CaptchaSection";
import Popup from "./Components/Popup";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [environmentData, setEnvironmentData] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = (enteredUsername, enteredPassword) => {
    if (enteredUsername === "admin" && enteredPassword === "password123") {
      setIsAuthenticated(true);
      setUsername(enteredUsername);
      showPopup("Authentication successful!");
    } else {
      showPopup("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setShowProfile(false);
    showPopup("You have been logged out.");
  };

  const captureEnvironment = () => {
    const parameters = [
      { name: "Device Type", value: navigator.userAgent },
      { name: "Screen Width", value: window.screen.width },
      { name: "Screen Height", value: window.screen.height },
      { name: "Browser Language", value: navigator.language },
      { name: "Platform", value: navigator.platform },
      { name: "Online Status", value: navigator.onLine ? "Online" : "Offline" },
      {
        name: "Time Zone",
        value: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ];
    setEnvironmentData(parameters);
    showPopup("Your environmental data has been captured for analysis.");
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  return (
    <div className="gov-website">
      <Header
        isAuthenticated={isAuthenticated}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        handleLogout={handleLogout}
      />
      <main className="container">
        {!isAuthenticated ? (
          <AuthSection handleLogin={handleLogin} />
        ) : (
          <CaptchaSection
            captureEnvironment={captureEnvironment}
            environmentData={environmentData}
          />
        )}
      </main>
      <Footer />
      {popupMessage && <Popup message={popupMessage} />}
    </div>
  );
};

export default App;
