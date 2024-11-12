import React from 'react';
import "../../assets/css/transactionDetailsModal1.css";

const TransactionDetailsModal1 = ({ transaction }) => {
  // Ensure that a transaction is passed
  if (!transaction) {
    return <div>No transaction data available.</div>;
  }

  return (
    <div className="modal">
      <h2>Transaction Details</h2>
      <div className="transaction-info">
        {/* Display the transaction details */}
        <h4>{transaction.itemName}</h4>
        {transaction.qtyAdded > 0 && <p>Quantity Added: {transaction.qtyAdded}</p>}
        {transaction.qtyUsed > 0 && <p>Quantity Used: -{transaction.qtyUsed}</p>}
        <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TransactionDetailsModal1;
