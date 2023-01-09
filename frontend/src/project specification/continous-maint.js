





{/*

Continuous maintenance of beneficiary register: It is important to maintain an
 up-to-date register of beneficiaries, to ensure that the right individuals are 
 receiving the benefits they are entitled to. This can be done through the use
  of a digital platform, which allows for the easy addition and removal of 
  individuals from the register as needed. create a react component for this with reactjs

Certainly! Here is an example of a simple React component that maintains a
 register of beneficiaries using an input form and a table to display the 
 list of beneficiaries:


*/}



import React, { useState } from 'react';

const BeneficiaryRegister = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [name, setName] = useState('');
  const [entitlement, setEntitlement] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setBeneficiaries([...beneficiaries, { name, entitlement }]);
    setName('');
    setEntitlement('');
  };

  const handleDelete = (index) => {
    const newBeneficiaries = [...beneficiaries];
    newBeneficiaries.splice(index, 1);
    setBeneficiaries(newBeneficiaries);
  };

  return (
    <div className="beneficiary-register">
      <form onSubmit={handleSubmit} className="beneficiary-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="beneficiary-input"
          />
        </label>
        <label>
          Entitlement:
          <input
            type="text"
            value={entitlement}
            onChange={(event) => setEntitlement(event.target.value)}
            className="beneficiary-input"
          />
        </label>
        <input type="submit" value="Add Beneficiary" className="beneficiary-button" />
      </form>
      <table className="beneficiary-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Entitlement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((beneficiary, index) => (
            <tr key={index}>
              <td>{beneficiary.name}</td>
              <td>{beneficiary.entitlement}</td>
              <td>
                <button onClick={() => handleDelete(index)} className="beneficiary-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeneficiaryRegister;





{/*


.beneficiary-form {
  display: flex;
  flex-wrap: wrap;
}

.beneficiary-input {
  margin: 5px;
}

.beneficiary-button {
  margin: 5px;
}

.beneficiary-table {
  border-collapse: collapse;
  width: 100%;
}

.beneficiary-table th,
.beneficiary-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.beneficiary-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.beneficiary-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}


*/}




