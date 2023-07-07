import React, { useState, useEffect } from 'react';
import SignupForm from './signup';
import LoginForm from './login';
import Appointment from './Appointments';
import Cart from './cart';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]); // Add cart state

  useEffect(() => {
    setShowLoginForm(false);
    setShowSignupForm(false);
  }, []);

  const handleSignupClick = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleRemoveFromCart = (service) => {
    const newCart = cart.filter((item) => item.service_id !== service.service_id);
    setCart(newCart);
  };

  return (
    <div>
      <h1 className="spa-title">SPA BEAUTY</h1>

      <nav className="nav1">
        <ul className="navlink-left">
          <li>
            <a className="navlink" href="/">
              Home
            </a>
            <a className="navlink" href="/Services">
              Services
            </a>
            <a href="/cart" onClick={handleCartClick}>
              Cart
            </a>
            <a className="navlink" href="/Appointment">
              Appointment
            </a>
            <a className="navlink" href="/contact">
              Contact
            </a>
            <a
              className="navlink"
              href="#"
              onClick={() => {
                setShowAppointments(true);
                setShowLoginForm(false);
                setShowSignupForm(false);
              }}
            >
              Appointment
            </a>
            {!isLoggedIn && (
              <a className="navlink" href="#" onClick={handleSignupClick}>
                Sign Up
              </a>
            )}
            {!isLoggedIn && (
              <a className="navlink" href="#" onClick={handleLoginClick}>
                Log In
              </a>
            )}
            {isLoggedIn && (
              <a className="navlink" href="/logout">
                Logout
              </a>
            )}
          </li>
        </ul>
      </nav>

      {isLoggedIn && (
        <div className="form-container">
          <h2>You are logged in!</h2>
        </div>
      )}
      {!isLoggedIn && (
        <div className="form-container">
          {showLoginForm && (
            <div>
              <h2>Login Form</h2>
              <LoginForm />
            </div>
          )}
          {showSignupForm && (
            <div>
              <h2>Signup Form</h2>
              <SignupForm />
            </div>
          )}
        </div>
      )}

      {showAppointments && <Appointment />}
      {showCart && <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />}
    </div>
  );
}

export default Navbar;
