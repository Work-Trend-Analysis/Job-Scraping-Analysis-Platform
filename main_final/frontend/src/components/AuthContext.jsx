import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      fetch(`http://localhost:8000/api/user/profile?email=${encodeURIComponent(storedEmail)}`)
        .then(r => r.ok ? r.json() : null)
        .then(userData => {
          if (userData) setUser(userData);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
