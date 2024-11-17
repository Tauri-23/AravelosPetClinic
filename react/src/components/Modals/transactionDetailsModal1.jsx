import React from 'react';
import "../../assets/css/transactionDetailsModal1.css";

export default function TransactionDetailsModal1(){

  return (
    <div className="modal1">
      <h2>Transaction Details</h2>
      <div className="transaction-info">
        {/* Display the transaction details */}
        <h4>NexGard</h4>
        <p>Quantity Added: 1</p>
        <p>Quantity Used: -</p>
        <p>Date: December 3, 2024 12:00PM</p>
      </div>
    </div>
  );
};

