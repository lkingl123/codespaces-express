const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true,   // This will ensure each contact has a unique email address
    lowercase: true, // This will ensure the email is stored in lowercase
    trim: true // This will trim whitespace from the email
  },
  phone: {
    type: String,
    required: false, // Phone is not required
    trim: true // This will trim whitespace from the phone number
  },
  address: {
    type: String,
    required: false // Address is not required
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
