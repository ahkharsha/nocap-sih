import React from 'react';
import { User } from 'lucide-react';

const Header = ({ isAuthenticated, showProfile, setShowProfile, handleLogout }) => {
  return (
    <header>
      <h1>UIDAI Authentication Portal</h1>
      {isAuthenticated && (
        <div className="profile-menu">
          <button className="profile-button" onClick={() => setShowProfile(!showProfile)}>
            <User size={24} />
          </button>
          {showProfile && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;