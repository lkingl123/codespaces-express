import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onAddContact }) => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
  const [isAdding, setIsAdding] = useState(false); // State to track when adding is in progress

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdding(true); // Set adding to true while the request is in progress
  
    axios.post(`${process.env.REACT_APP_API_URL}/contacts`, contact)
      .then(response => {
        console.log('Contact added:', response.data);
        onAddContact(response.data);  // Update the parent component's state with the new contact
        setIsAdding(false); // Reset adding state to false
        setContact({ name: '', email: '', phone: '', address: '' }); // Clear the form
      })
      .catch(error => {
        console.error('Error adding contact:', error);
        setIsAdding(false); // Reset adding state to false in case of an error
      });
  };
  

  return (
    <div className="container">
    <form onSubmit={handleSubmit} className="mb-3">
    <div className="mb-3 mt-4">
      <input
        name="name"
        value={contact.name}
        onChange={handleChange}
        className="form-control"
        placeholder="Name"
        required
      />
    </div>
    <div className="mb-3">
      <input
        name="email"
        value={contact.email}
        onChange={handleChange}
        className="form-control"
        placeholder="Email"
        required
      />
    </div>
    <div className="mb-3">
      <input
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        className="form-control"
        placeholder="Phone"
        required
      />
    </div>
    <div className="mb-3">
      <input
        name="address"
        value={contact.address}
        onChange={handleChange}
        className="form-control"
        placeholder="Address"
        required
      />
    </div>
      <button type="submit" className="btn btn-secondary" disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add Contact'}
      </button>
    </form>
    </div>
  );
};

export default ContactForm;
