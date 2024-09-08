import React from 'react';

const CaptchaSection = ({ captureEnvironment, environmentData }) => {
  return (
    <div className="captcha-section" id="captcha-section">
      <h2>Welcome to the UIDAI Portal</h2>
      <p>
        This portal ensures secure access to UIDAI services and protects against bot and denial-of-service attacks.
        By visiting this page, you agree that your environmental parameters may be passively collected and analyzed
        to enhance security. Minimal human interaction may be required for verification purposes.
      </p>

      <button className="button" onClick={captureEnvironment}>Proceed</button>

      {environmentData.length > 0 && (
        <div className="environment-data">
          <h3>Your Environment Details</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
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

export default CaptchaSection;