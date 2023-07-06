import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the login data
    const data = {
      email: email,
      password: password,
    };
  
    // Make a GET request to the login endpoint
    const url = '/users?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
    fetch(url)
      .then((response) => {
        // Handle the response from the server
        if (response.status === 200) {
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
