import React from 'react';
import '../../assets/css/inventoryBoxModal1.css';

const InventoryBoxModal1 = ({ itemName, itemImage, itemQuantity, itemDescription, onClose }) => {
    return (
        <div className="modal1">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={itemImage} alt={itemName} className="modal-image" />
                <h2>{itemName}</h2>
                <p>Quantity: {itemQuantity}</p>
                <p>{itemDescription || 'No description available.'}</p>
            </div>
        </div>
    );
};

export default InventoryBoxModal1;
