import React, { useState } from 'react';

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
          alert('Signup successful');
        } else {
          alert('Signup failed');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  
  return (
    <div className='sign'>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={styles.input}
          />
        </label>
        <br />
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
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
