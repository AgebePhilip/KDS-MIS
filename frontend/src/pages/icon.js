import React from 'react';
import './icon.css';

const Icon = (props) => {
  return (
    <div className="icon-container">
      <div className="icon-box">
        <i className="fab fa-kadrim">welcome to kadrima</i>

        <button className="view-btn">View</button>
      </div>
      <div className="icon-box">
        <i className="fas fa-money-bill-alt"></i>
        <button className="view-btn">View</button>
      </div>
      <div className="icon-box">
        <i className="fab fa-mastercard"></i>
        <button className="view-btn">View</button>
      </div>
      <div className="icon-box">
        <i className="fab fa-philips"></i>
        <button className="view-btn">View</button>
      </div>
    </div>
  );
};

export default Icon;