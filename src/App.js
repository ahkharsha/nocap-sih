import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:3000/auth/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page-container">
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { BrowserRoute, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import AuthSection from "./Components/AuthSection";
// import CaptchaSection from "./Components/CaptchaSection";
// import Popup from "./Components/Popup";
// import "./App.css";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState("");
//   const [environmentData, setEnvironmentData] = useState([]);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showProfile, setShowProfile] = useState(false);

//   const handleLogin = (enteredUsername, enteredPassword) => {
//     if (enteredUsername === "admin" && enteredPassword === "password123") {
//       setIsAuthenticated(true);
//       setUsername(enteredUsername);
//       showPopup("Authentication successful!");
//     } else {
//       showPopup("Invalid credentials. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUsername("");
//     setShowProfile(false);
//     showPopup("You have been logged out.");
//   };

//   const captureEnvironment = () => {
//     const parameters = [
//       { name: "Device Type", value: navigator.userAgent },
//       { name: "Screen Width", value: window.screen.width },
//       { name: "Screen Height", value: window.screen.height },
//       { name: "Browser Language", value: navigator.language },
//       { name: "Platform", value: navigator.platform },
//       { name: "Online Status", value: navigator.onLine ? "Online" : "Offline" },
//       {
//         name: "Time Zone",
//         value: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//     ];
//     setEnvironmentData(parameters);
//     showPopup("Your environmental data has been captured for analysis.");
//   };

//   const showPopup = (message) => {
//     setPopupMessage(message);
//     setTimeout(() => setPopupMessage(""), 3000);
//   };

//   return (
//     <div className="gov-website">
//       <Header
//         isAuthenticated={isAuthenticated}
//         showProfile={showProfile}
//         setShowProfile={setShowProfile}
//         handleLogout={handleLogout}
//       />
//       <main className="container">
//         {!isAuthenticated ? (
//           <AuthSection handleLogin={handleLogin} />
//         ) : (
//           <CaptchaSection
//             captureEnvironment={captureEnvironment}
//             environmentData={environmentData}
//           />
//         )}
//       </main>
//       <Footer />
//       {popupMessage && <Popup message={popupMessage} />}
//     </div>
//   );
// };

// export default App;
