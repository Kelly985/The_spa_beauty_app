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
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the name exists in the users table
    const response = await fetch(`http://localhost:5000/users?name=${name}`);
    const usersData = await response.json();

    if (usersData.length > 0) {
      const userId = usersData[0].id;

      // Create the appointment
      const appointmentData = {
        user_id: userId,
        service_id: selectedService,
        date: date, // Include the date in the appointment data
      };

      const appointmentResponse = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const appointmentResult = await appointmentResponse.json();
      setAppointmentId(appointmentResult.id);
    } else {
      console.log('User not found');
    }
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
      {appointmentId && <p>Appointment ID: {appointmentId}</p>}
    </div>
  );
}

export default AppointmentsForm;
