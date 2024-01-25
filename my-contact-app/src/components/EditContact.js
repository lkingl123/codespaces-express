import React, { useState } from 'react';

const EditContact = ({ editContact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState(editContact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleSave = () => {
    // Call the onSave function with the edited contact
    onSave(editedContact);
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedContact.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={editedContact.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditContact;
