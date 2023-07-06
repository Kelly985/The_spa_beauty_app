import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Services from './Pages/Services'
import Navbar from './Components/Navbar';

    

function App() {
  return (
  
    
    <BrowserRouter>
    <Navbar />

    <main>
      <Routes>
    

     
      <Route path="/" element={<Homepage />} />
      <Route path="Services" element={<Services />} />
    
    </Routes>
    </main>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
