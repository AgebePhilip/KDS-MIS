import React,{useState} from 'react';
import HomeHeader from '../../components/headers/Home';
import './contact.css'

const  HomeContact =() =>{
  const [income, setIncome] = useState(0);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [eligibility, setEligibility] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const handleEmploymentStatusChange = (event) => {
    setEmploymentStatus(event.target.value);
  };

  const determineEligibility = () => {
    if (employmentStatus === 'unemployed' || income < 20000) {
      setEligibility(true);
    } else {
      setEligibility(false);
    }
  };

  const handleEnrollment = () => {
    if (eligibility) {
      setEnrolled(true);
    }
  };
  return(
    <>
      <HomeHeader />
      <div className="authentication-container">
      <h1>Authentication</h1>
      <form>
        <label htmlFor="fingerprint-scan">Fingerprint Scan:</label>
        <input type="text" id="fingerprint-scan" />
        <button type="submit">Submit</button>
      </form>
      <div className="compliance-monitoring">
        <h2>Compliance Monitoring</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus molestie porta nibh, eget malesuada ipsum consequat
          et. Aliquam dictum enim in dolor condimentum, non iaculis
          eros aliquet.
        </p>
      </div>
    </div>
    </>
  )
}

export default HomeContact