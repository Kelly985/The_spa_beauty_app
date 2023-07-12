import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Services() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

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

  const handleAddToCart = (service) => {
    // Check if the service is already in the cart.
    const index = cart.findIndex((item) => item.service_id === service.id);

    if (index !== -1) {
      // The service is already in the cart, so remove it.
      const newCart = cart.filter((item) => item.service_id !== service.id);
      setCart(newCart);
      setCount(count - 1);
    } else {
      // The service is not in the cart, so add it.
      setCart([...cart, service]);
      setCount(count + 1);
    }
  };

  const handleTotalClick = () => {
    // Calculate the total price of services in the cart
    const total = cart.reduce((accumulator, service) => accumulator + service.price, 0);
  
    // Display the total using SweetAlert
    Swal.fire({
      title: 'Total',
      text: `The total price of services in the cart is $${total.toFixed(2)}`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        // Post the total to the database
        const data = {
          appointment_id: 5, // Replace with the actual appointment ID
          total_amount: total,
        };
  
        fetch('/appointments/total', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result.message); // Handle the response as needed
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  };
  

  return (
    <div className="services-container">
      <h1>Services</h1>
      <br />
      <br />
      <br />
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} handleAddToCart={handleAddToCart} />
      ))}
      <button className="cart-button" onClick={handleTotalClick}>
        Total
      </button>
      <p>Cart: {count}</p>
      {cart.length > 0 && <Cart services={cart} />}
    </div>
  );
}

function ServiceCard({ service, handleAddToCart }) {
  return (
    <div className="service-card">
      <img className="service-image" src={service.image_url} alt={service.name} />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <button className="add-to-cart" onClick={() => handleAddToCart(service)}>
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ services }) {
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
