// src/components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onAddContact }) => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/contacts`, contact)
      .then(response => {
        console.log('Contact added:', response.data);
        onAddContact(response.data);  // Update the parent component's state
      })
      .catch(error => console.error('Error adding contact:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
