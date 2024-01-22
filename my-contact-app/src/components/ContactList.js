// src/components/ContactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/contacts`)
      .then(response => {
        console.log('Data received:', response.data);
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        console.log('Environment API URL:', process.env.REACT_APP_API_URL);
      });
  }, []);

  return (
    <div>
      {contacts.map(contact => (
        <div key={contact._id}>
          <h2>{contact.name}</h2>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          {/* Add additional contact details here */}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
