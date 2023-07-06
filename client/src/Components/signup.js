import React, { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the signup data
    const data = {
      name: name,
      email: email,
      password: password,
    };
  
    // Make a POST request to the signup endpoint
    const url = '/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add this line
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => {
        // Handle the response from the server
        if (response.status === 200) {
          console.log('Signup successful');
        } else {
          console.log('Signup failed');
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
        Name:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <br />
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
