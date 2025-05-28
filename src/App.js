import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from 'react';

const Login = lazy(() => import('./components/pages/login/login'));


function App() {
  return (
    <Suspense>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </Suspense>
  );
}

export default App;