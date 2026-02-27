import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CropRec from './pages/CropRec';
import DiseaseDetect from './pages/DiseaseDetect';
import MarketPrices from './pages/MarketPrices';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-secondary)]">
        {/* Simple Navbar */}
        <nav className="bg-[var(--color-primary)] p-4 text-white flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">FarmGuide</h1>
          {user && (
            <button
              onClick={() => {
                localStorage.removeItem('userInfo');
                setUser(null);
                window.location.href = '/login';
              }}
              className="text-white hover:underline"
            >
              Logout
            </button>
          )}
        </nav>

        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            <Route path="/login" element={<Login setAuthUser={setUser} />} />
            <Route path="/register" element={<Register setAuthUser={setUser} />} />

            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/crop-rec" element={user ? <CropRec /> : <Navigate to="/login" />} />
            <Route path="/disease-detect" element={user ? <DiseaseDetect /> : <Navigate to="/login" />} />
            <Route path="/market-prices" element={user ? <MarketPrices /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
