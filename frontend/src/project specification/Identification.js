
{/*

Identification and registration: This can be done through the creation of a digital registration 
platform that is linked to the State Social Register (SSR). This platform can be used for 
on-demand data collection, allowing individuals to self-register for social protection benefits. 
The platform should also have the capability to verify the identity of the individuals registering,
 to ensure that only eligible individuals are able to access the benefits.
please, create a react component for the information above with css

Here is a example of a React component 
that implements a digital registration platform for
 social protection benefits, based on the description provided:


*/}



import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    SSN: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Verify identity and register individual for benefits
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h1>Self-Registration for Social Protection Benefits</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="SSN">Social Security Number:</label>
      <input
        type="text"
        name="SSN"
        value={formData.SSN}
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default RegistrationForm;






{/*


.registration-form {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.registration-form input[type="text"],
.registration-form input[type="number"] {
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.registration-form input[type="submit"] {
  width: 20%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.registration-form input[type="submit"]:hover {
  background-color: #45a049;
}


*/}