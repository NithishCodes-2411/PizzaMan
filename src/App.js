import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from 'react';

const Login = lazy(() => import('./components/Pages/Login/Login.js'));
const Register = lazy(() => import('./components/Pages/Register/Register.js'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add more routes as needed */}
          </Routes>
        </header>
      </div>
    </Suspense>
  );
}

export default App;