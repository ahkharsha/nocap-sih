import React, { useState } from "react";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Footer from "./components/Footer";
import Header from "./components/header";
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext/index";
import { useNavigate, useRoutes } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
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

  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: (
        <main className="container">
          <Home
            captureEnvironment={captureEnvironment}
            environmentData={environmentData}
          />
        </main>
      ),
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header showProfile={showProfile} setShowProfile={setShowProfile} />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;
