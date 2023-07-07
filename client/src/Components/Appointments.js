import React, { useState, useEffect } from 'react';

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

function Appointments() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch services from the Flask API
  useEffect(() => {
    fetch('/services_name')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error(error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the appointment data
    const data = {
      service: selectedService,
      date: date,
      name: name
    };

    // Make a POST request to the Flask API
    const url = '/appointments';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        if (data.message === 'Appointment created successfully') {
          setMessage('Appointment created successfully');
          // Clear the form fields
          setSelectedService('');
          setDate('');
          setName('');
        } else {
          setMessage('Failed to create appointment');
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
        setMessage('An error occurred while creating the appointment');
      });
  };

  // Handle service selection
  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>Book a service</h2>
      <h2>Appointments</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label style={styles.label} htmlFor="service">Service:</label>
          <select id="service" value={selectedService} onChange={handleServiceChange} style={styles.input}>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={handleDateChange} style={styles.input} />
        </div>
        <div>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Create Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Appointments;
