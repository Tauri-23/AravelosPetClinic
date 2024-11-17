import React from 'react';
import "../../assets/css/transactionDetailsModal1.css";

export default function TransactionDetailsModal1({ transactions, onClose }) {
  // Sort transactions in FIFO manner based on date
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="modal1">
      <div className="transaction-info">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3 className='anybody'>Transaction History</h3>

        {/* Display added transactions */}
        {sortedTransactions
          .filter(transaction => transaction.qtyAdded > 0)
          .map(transaction => (
            <div key={`added-${transaction.id}`} className="transaction-item added">
              <img
                src={transaction.itemImageUrl}
                alt={transaction.itemName}
                className="item-image"
              />
              <div className="transaction-details">
                <div><strong>Item Name:</strong> {transaction.itemName}</div>
                <div><strong>Quantity Added:</strong> {transaction.qtyAdded}</div>
                <div><strong>Item Measurement: 50mL</strong> {transaction.itemMeasurement}</div>
                <div><strong>Expiration Date: 11/17/2028</strong> {transaction.itemExpiration}</div>
                <div><strong>Date:</strong> {transaction.date.toLocaleDateString()}</div>
                <div><strong>Time:</strong> {transaction.date.toLocaleTimeString()}</div>
              </div>
            </div>
          ))}

        {/* Display used transactions */}
        {sortedTransactions
          .filter(transaction => transaction.qtyUsed > 0)
          .map(transaction => (
            <div key={`used-${transaction.id}`} className="transaction-item used">
              <img
                src={transaction.itemImageUrl}
                alt={transaction.itemName}
                className="item-image"
              />
              <div className="transaction-details">
                <div><strong>Item Name:</strong> {transaction.itemName}</div>
                <div><strong>Quantity Used:</strong> {transaction.qtyUsed}</div>
                <div><strong>Item Measurement: 5mg</strong> {transaction.itemMeasurement}</div>
                <div><strong>Expiration Date: None</strong> {transaction.itemExpiration}</div>
                <div><strong>Date:</strong> {transaction.date.toLocaleDateString()}</div>
                <div><strong>Time:</strong> {transaction.date.toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
