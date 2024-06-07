import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import StudentTeacher from './pages/StudentTeacher';
 

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Render the app
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/student-teacher" element={<StudentTeacher />} />
     
    </Routes>
  </Router>
);