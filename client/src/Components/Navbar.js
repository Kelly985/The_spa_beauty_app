import React from 'react'
function Navbar() {
  return (
    <nav>
      <a href='/' className='spa-title'>SPA BEAUTY</a>
      <ul>
        <li>
          <a href='/home'>home</a>
          <a href='/contact'>contact</a>
          <a href='/appointment'>appointment</a>
          <a href='/login'>login</a>
          <a href='/sign up'>sign up</a>
          
          
        </li>
      </ul>
    </nav>
  )
}
export default Navbar