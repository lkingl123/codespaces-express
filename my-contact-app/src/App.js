// src/App.js
import React, { useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm'; // Make sure to import the ContactForm component
import './App.css'; // Assuming you have this CSS file for styling


function App() {

    const [contacts, setContacts] = useState([]);
  
    // Function to add a new contact to the state
    const addContact = (newContact) => {
      setContacts([...contacts, newContact]);
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contacts</h1>
      </header>
      <ContactForm onAddContact={addContact} />
      <ContactList />
    </div>
  );
}

export default App;
