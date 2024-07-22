import React from 'react';

import './assets/style.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Universities from './pages/universities';
import UniversitiesDetails from './pages/universitiesDetails';
import Loader from './shared/components/Loader';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Universities />} />
          <Route path="/details/:id" element={<UniversitiesDetails />} />
        </Routes>
      </Router>

      <Loader />
    </>
  );
};

export default App;