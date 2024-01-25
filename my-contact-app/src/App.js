import React, { useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  // Function to add a new contact to the state
  const addContact = (newContact) => {
    // Display an alert when the contact is added
    window.alert(`Contact ${newContact.name} added successfully!`);

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    setContacts([...contacts, newContact]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contacts</h1>
      </header>
      <ContactForm onAddContact={addContact} />
      <ContactList/>
    </div>
  );
}

export default App;
