import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditContact from './EditContact'; // Import the EditContact component

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null); // Track the contact being edited
  const [showContacts, setShowContacts] = useState(true);

  useEffect(() => {
    // Fetch the contacts when the component mounts
    axios
      .get(`${process.env.REACT_APP_API_URL}/contacts`)
      .then((response) => {
        console.log('Data received:', response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        console.log('Environment API URL:', process.env.REACT_APP_API_URL);
      });
  }, []);

  const handleToggleContacts = () => {
    setShowContacts((prevShowContacts) => !prevShowContacts); // Toggle the state to show/hide contacts
  };

  const handleEditClick = (contact) => {
    // Set the contact being edited in the state
    setEditContact(contact);
  };

  const handleDeleteClick = (contactId) => {
    // Implement the logic to delete a contact
    axios
      .delete(`${process.env.REACT_APP_API_URL}/contacts/${contactId}`)
      .then((response) => {
        console.log('Contact deleted:', response.data);
        // Remove the deleted contact from the state
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  const handleSaveClick = (editedContact) => {
    // Make an API request to update the contact
    axios
      .put(`${process.env.REACT_APP_API_URL}/contacts/${editedContact._id}`, editedContact)
      .then((response) => {
        console.log('Contact updated:', response.data);
        // Update the contact in the state with the edited contact
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === editedContact._id ? response.data : contact
          )
        );
        // Set editContact back to null to close the edit form
        setEditContact(null);
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  };

  return (
    <div>
      <button 
  className="btn btn-primary dropdown-toggle mb-4"
  type="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
  onClick={handleToggleContacts}
>
        {showContacts ? 'Hide Contacts' : 'Show Contacts'}
      </button>
      {showContacts && (
        <div>
          {contacts.map((contact) => (
            <div key={contact._id} className="mb-3 p-3 border border-secondary">
              <h2>{contact.name}</h2>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <button className="btn btn-primary me-2" onClick={() => handleEditClick(contact)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteClick(contact._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {editContact && (
        <EditContact
          editContact={editContact}
          onSave={handleSaveClick}
          onCancel={() => setEditContact(null)}
        />
      )}
    </div>
  );
};

export default ContactList;
