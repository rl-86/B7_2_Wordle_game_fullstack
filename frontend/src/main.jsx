import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import InfoPage from './components/InfoPage';
import Highscores from './components/Highscores';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/info' element={<InfoPage />} />
        <Route path='/highscores' element={<Highscores />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
