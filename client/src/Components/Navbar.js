import React from 'react'


function Navbar() {
  return (
  <div>
    <h1 className='spa-title'>  SPA BEAUTY </h1>
  
    
<nav className='nav1'>
  
  <ul className='navlink-left'>
    <li>
      <a className='navlink' href='/home'>Home</a>
      <a className='navlink' href='/contact'>Contact</a>
      <a className='navlink' href='/appointment'>Appointment</a>
    </li>
  </ul>
  <div className='dropdown'>
    <span className='navlink-right dropdown-trigger'>Register</span>
    <div className='dropdown-content'>
      <a href='/signup'>Sign Up</a>
      <a href='/login'>Login</a>
    </div>
  </div>
</nav>
</div>
  )
}
export default Navbar