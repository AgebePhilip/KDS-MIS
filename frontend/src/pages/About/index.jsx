import React,{useState} from "react";
import HomeHeader from "../../components/headers/Home";
import './about.css';


const  AboutHome = () => {

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
  
  return(
    <>
     <HomeHeader />
     <form onSubmit={handleSubmit} className="registration-form">
      <h1>Self-Registration for Social Protection Benefits</h1>
      
      <input
        type="text"
        placeholder="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        placeholder="please insert your age here"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <br />
      <input
        type="text"
        name="SSN"
        value={formData.SSN}
        onChange={handleChange}
        placeholder="Social Security Number:"
      />
      <br />
      <input type="submit" value="continue" />
    </form>
    </>
  )
}


export default AboutHome