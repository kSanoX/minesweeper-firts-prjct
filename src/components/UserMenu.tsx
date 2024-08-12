import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const UserMenu: React.FC = () => {
  const { username, setAuth, setUsername } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth(false);
    setUsername(null);
    window.location.href = '/login';
  };

  return (
    <div className="user-menu">
      <span onClick={() => setIsMenuOpen(!isMenuOpen)}>{username}</span>
      {isMenuOpen && (
        <div className="user-menu-dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
