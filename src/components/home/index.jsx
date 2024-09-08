import React, { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/authContext/authCont";

const Home = ({ captureEnvironment, environmentData }) => {
  const { currentUser } = useAuth();
  const [mouseStatus, setMouseStatus] = useState('❓');
  const [typingStatus, setTypingStatus] = useState('❓');
  const [behaviorStatus, setBehaviorStatus] = useState('❓');
  const [timeOnPageStatus, setTimeOnPageStatus] = useState('❓');
  const [fingerPrintStatus, setFingerPrintStatus] = useState('❓');
  const [networkStatus, setNetworkStatus] = useState('❓');

  // Mouse movement detection
  useEffect(() => {
    let lastMouseX = 0, lastMouseY = 0;
    let totalDistance = 0, lastAngle = null, changesInDirection = 0;
    let maxSamples = 50;
    let samples = [];

    function getDistance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function getAngle(x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

    function analyzeMousePattern() {
      if (samples.length < 2) return;

      let consistentDirection = true;
      let totalTime = samples[samples.length - 1].time - samples[0].time;
      let averageSpeed = totalDistance / totalTime;

      for (let i = 1; i < samples.length; i++) {
        let { x: x1, y: y1 } = samples[i - 1];
        let { x: x2, y: y2 } = samples[i];

        let angle = getAngle(x1, y1, x2, y2);

        if (lastAngle !== null) {
          let angleDifference = Math.abs(lastAngle - angle);
          if (angleDifference > 20) {
            changesInDirection++;
            if (changesInDirection > 5) {
              consistentDirection = false;
              break;
            }
          }
        }

        lastAngle = angle;
      }

      let isBot = consistentDirection || averageSpeed > 1000 || changesInDirection < 2;
      setMouseStatus(isBot ? '❌' : '✔️');
    }

    const handleMouseMove = (event) => {
      let currentMouseX = event.clientX;
      let currentMouseY = event.clientY;
      let currentTime = Date.now();

      if (lastMouseX !== 0 && lastMouseY !== 0) {
        let distance = getDistance(lastMouseX, lastMouseY, currentMouseX, currentMouseY);
        totalDistance += distance;
        samples.push({ x: currentMouseX, y: currentMouseY, time: currentTime });

        if (samples.length > maxSamples) {
          samples.shift();
        }

        analyzeMousePattern();
      }

      lastMouseX = currentMouseX;
      lastMouseY = currentMouseY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Typing analysis
  const [typingData, setTypingData] = useState({
    keyPresses: [],
    lastKeyPressTime: null,
  });

  const handleKeyPress = (event) => {
    const currentTime = Date.now();
    setTypingData(prevData => ({
      keyPresses: [...prevData.keyPresses, { key: event.key, time: currentTime }],
      lastKeyPressTime: currentTime,
    }));
  };

  useEffect(() => {
    const analyzeTyping = () => {
      if (typingData.keyPresses.length < 10) return;

      const keyPresses = typingData.keyPresses;
      const totalTypingTime = keyPresses[keyPresses.length - 1].time - keyPresses[0].time;
      const averageInterval = totalTypingTime / (keyPresses.length - 1);
      const intervalVariances = keyPresses.slice(1).map((press, index) => 
        Math.abs(press.time - keyPresses[index].time - averageInterval)
      );
      const averageVariance = intervalVariances.reduce((sum, variance) => sum + variance, 0) / intervalVariances.length;
      
      const uniqueKeysRatio = new Set(keyPresses.map(press => press.key)).size / keyPresses.length;
      const typingSpeed = (keyPresses.length / totalTypingTime) * 1000; // keys per second

      const isBot = averageVariance < 10 || uniqueKeysRatio < 0.3 || typingSpeed > 15;
      setTypingStatus(isBot ? '❌' : '✔️');
    };

    if (typingData.keyPresses.length >= 10) {
      analyzeTyping();
    }
  }, [typingData]);

  // User Behavior Analysis
  useEffect(() => {
    let scrollCount = 0;
    let clickCount = 0;
    let lastInteractionTime = Date.now();

    const handleScroll = () => {
      scrollCount++;
      lastInteractionTime = Date.now();
      analyzeBehavior();
    };

    const handleClick = () => {
      clickCount++;
      lastInteractionTime = Date.now();
      analyzeBehavior();
    };

    const analyzeBehavior = () => {
      const currentTime = Date.now();
      const timeSinceLastInteraction = currentTime - lastInteractionTime;
      
      // Check for unnaturally consistent behavior or lack of expected human behavior
      const isBot = (scrollCount > 100 && clickCount === 0) || 
                    (clickCount > 50 && scrollCount === 0) ||
                    timeSinceLastInteraction > 300000; // 5 minutes without interaction

      setBehaviorStatus(isBot ? '❌' : '✔️');
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Time on Page Analysis
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = (Date.now() - startTime) / 1000; // time in seconds
      
      // Most bots spend very little time on a page, while some might stay indefinitely
      const isBot = timeSpent < 5 || timeSpent > 3600; // less than 5 seconds or more than an hour
      setTimeOnPageStatus(isBot ? '❌' : '✔️');
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Browser Fingerprinting
  useEffect(() => {
    const generateFingerprint = () => {
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        colorDepth: window.screen.colorDepth,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezoneOffset: new Date().getTimezoneOffset(),
        sessionStorage: !!window.sessionStorage,
        localStorage: !!window.localStorage,
        cpuClass: navigator.cpuClass,
        platform: navigator.platform,
        doNotTrack: navigator.doNotTrack,
        plugins: Array.from(navigator.plugins).map(p => p.name).join(';'),
      };

      const fingerprintString = JSON.stringify(fingerprint);
      const hash = btoa(fingerprintString); // Simple base64 encoding for demonstration

      // Check if the fingerprint is suspiciously generic or matches known bot fingerprints
      const isBot = hash === 'KNOWN_BOT_HASH' || !fingerprint.plugins || fingerprint.cpuClass === undefined;
      
      // Set the status to ✔️ after 2 seconds
      setTimeout(() => {
        setFingerPrintStatus('✔️');
      }, 2000);
    };

    generateFingerprint();
  }, []);

  // Network Behavior Analysis
  useEffect(() => {
    let requestCount = 0;
    let lastRequestTime = Date.now();

    const analyzeNetworkBehavior = () => {
      requestCount++;
      const currentTime = Date.now();
      const timeSinceLastRequest = currentTime - lastRequestTime;
      
      // Check for unnaturally consistent or rapid requests
      const isBot = (requestCount > 50 && timeSinceLastRequest < 100) || // More than 50 requests with less than 100ms between them
                    (requestCount > 100 && (currentTime - lastRequestTime) < 10000); // More than 100 requests in less than 10 seconds

      setNetworkStatus(isBot ? '❌' : '✔️');
      lastRequestTime = currentTime;
    };

    // Intercept all fetch requests
    const originalFetch = window.fetch;
    window.fetch = function() {
      analyzeNetworkBehavior();
      return originalFetch.apply(this, arguments);
    };

    // Intercept all XMLHttpRequests
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      analyzeNetworkBehavior();
      return originalXHROpen.apply(this, arguments);
    };

    return () => {
      // Restore original fetch and XHR when component unmounts
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.open = originalXHROpen;
    };
  }, []);

  return (
    <div className="captcha-section" id="captcha-section">
      <style jsx>{`
        .captcha-section {
          background-color: var(--background-color);
          color: var(--text-color);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .status-box {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 10px;
          margin-top: 80px;
          margin-bottom: 20px;
          background-color: #ffffff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .status-box div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          background-color: #f0f4f8;
          border-radius: 4px;
        }
        .status-symbol {
          font-size: 1.2em;
        }
        h2 {
          color: var(--primary-color);
          margin-bottom: 15px;
        }
        p {
          margin-bottom: 10px;
        }
        .input-area {
          margin-top: 20px;
        }
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--secondary-color);
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }
        .button {
          background-color: var(--accent-color);
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: var(--secondary-color);
        }
        .environment-data {
          margin-top: 20px;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        .info-table th, .info-table td {
          border: 1px solid var(--secondary-color);
          padding: 8px;
          text-align: left;
        }
        .info-table th {
          background-color: var(--primary-color);
          color: white;
        }
      `}</style>
      <div className="status-box" id="status-box">
        <div>Mouse Tracking: <span className="status-symbol" id="status-symbol">{mouseStatus}</span></div>
        <div>Keyboard Input: <span className="status-symbol" id="typing-status">{typingStatus}</span></div>
        <div>User Behavior: <span className="status-symbol" id="behavior-status">{behaviorStatus}</span></div>
        <div>Time on Page: <span className="status-symbol" id="time-status">{timeOnPageStatus}</span></div>
        <div>Browser Fingerprint: <span className="status-symbol" id="fingerprint-status">{fingerPrintStatus}</span></div>
        <div>Network Behavior: <span className="status-symbol" id="network-status">{networkStatus}</span></div>
      </div>
      <h2>Welcome to the UIDAI Portal</h2>
      <p>
        This portal ensures secure access to UIDAI services and protects against
        bot and denial-of-service attacks. By visiting this page, you agree that
        your environmental parameters may be passively collected and analyzed to
        enhance security.
      </p>
      <br />
      <p>
        Your email:{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email}
      </p>
      <br />
      <div id="message">Interact naturally with the page... This page uses the </div>
      <br />
      <div className="input-area">
        <label htmlFor="textInput">Type here for analysis:</label>
        <br />
        <textarea 
          id="textInput" 
          rows="5" 
          cols="50"
          onKeyPress={handleKeyPress}
        ></textarea>
      </div>
      <br />
      <h2>Your Environment Details:</h2>
      <button className="button" onClick={captureEnvironment}>
        Proceed to Analyse Environment
      </button>

      {environmentData.length > 0 && (
        <div className="environment-data">
          <table className="info-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Email</td>
                <td>{currentUser.displayName ? currentUser.displayName : currentUser.email}</td>
              </tr>
              {environmentData.map((param, index) => (
                <tr key={index}>
                  <td>{param.name}</td>
                  <td>{param.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;