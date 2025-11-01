// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DashBoard from './pages/Dashboard';
import Settings from './pages/Settings';
import NewsBoard from './pages/Newsboard';
import Auth from './Auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Prevents flicker

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (!authChecked) return <p>Loading...</p>;

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <Routes>
          {!user ? (
            <Route path="*" element={<Auth onUser={setUser} />} />
          ) : (
            <>
              <Route path="/" element={<DashBoard user={user} />} />
              <Route path="/settings" element={<Settings user={user} />} />
              <Route path="/Newsboard" element={<NewsBoard user={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
