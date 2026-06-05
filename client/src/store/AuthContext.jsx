import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('foodq_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = sessionStorage.getItem('foodq_isAdmin');
    return saved === 'true';
  });

  const login = (username, password) => {
    // Hardcoded credentials for now
    if (username === 'admin' && password === 'admin123') {
      const user = { username: 'admin', role: 'Admin', name: 'Admin User' };
      setCurrentUser(user);
      setIsAdmin(true);
      sessionStorage.setItem('foodq_user', JSON.stringify(user));
      sessionStorage.setItem('foodq_isAdmin', 'true');
      return true;
    } else if (username === 'staff' && password === 'staff123') {
      const user = { username: 'staff', role: 'Staff', name: 'Staff User' };
      setCurrentUser(user);
      setIsAdmin(false);
      sessionStorage.setItem('foodq_user', JSON.stringify(user));
      sessionStorage.setItem('foodq_isAdmin', 'false');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('foodq_user');
    sessionStorage.removeItem('foodq_isAdmin');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isStaff: currentUser?.role === 'Staff',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
