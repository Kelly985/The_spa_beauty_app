import React, { useState, useEffect } from 'react';

function AppointmentsForm() {
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
    <div className="appointments-form">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Service:</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {appointmentId && <p>Appointment ID: {appointmentId}</p>}
    </div>
  );
}

export default AppointmentsForm;
