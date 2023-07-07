
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.label}>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
      </label>
      <br />
      <button type="submit" style={styles.button}>Log In</button>
    </form>
  );
}
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    margin: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};
export default LoginForm;