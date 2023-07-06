import React, { useEffect, useState } from 'react';function Body() {
    const [services, setServices] = useState([]);  useEffect(() => {
        fetchServices();
    }, []);  const fetchServices = async () => {
        try {
        const response = await fetch('http://localhost:5000/services');
        const data = await response.json();
        setServices(data);
        } catch (error) {
        console.log('Error fetching services:', error);
        }
    };  return ( 
        <div className="services-container">
        {/* <div>
            <h1>Services</h1>
        </div> */}
        
        <br></br>
        <br></br>
        <br></br>
        {services.map((service) => (
            <div className="service-card" key={service.id}>
            <img className="service-image" src={service.image_url} alt={service.name} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <button>BOOK APPOINTMENT </button>
            </div>
        ))}
        </div>
    );
}export default Body;