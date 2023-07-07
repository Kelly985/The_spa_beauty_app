import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Homepage from './Components/Homepage';
import Services from './Components/Services';
import LoginForm from './Components/Login';
import Navbar from './Components/Navbar';
import Appointment from './Components/Appointments';
import SignupForm from './Components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="Services" element={<Services />} />
          <Route path="Appointment" element={<Appointment />} />
          <Route path="LoginForm" element={<LoginForm />} />
          <Route path="SignupForm" element={<SignupForm />} />


        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

