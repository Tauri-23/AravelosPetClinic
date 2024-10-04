import React, { useState } from 'react';
import '../../assets/css/inventoryBoxModal1.css';
import * as Icon from 'react-bootstrap-icons';
import EditItemModal1 from './editItemModal1'; // Import the new modal

const InventoryBoxModal1 = ({ itemName, itemImage, itemQuantity, itemDescription, onClose }) => {
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);

    const handleEditItemClick = (itemId, itemName) => {
        console.log(`Editing item: ${itemId}, Name: ${itemName}`);
        // Add your edit logic here, e.g., show edit form or fetch item details
    };

    return (
        <div className="modal2"> {/* Updated modal2 class for consistency */}
            <div className="box-modal modal-content1">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <div className='modalHeader1 bottom-margin-s bold anybody semi-medium-f'>
                    <span>Item Details</span>
                    <div className='edit-btn-icon'>
                        <img
                            src="/assets/media/icons/edit_btn.svg"
                            alt="Edit"
                            title="Edit Item Details"
                            onClick={() => setIsEditItemModalOpen(true)} // Open the edit item modal
                        />
                    </div>
                </div>
                <img src={`/assets/media/items/${itemImage}`} alt={itemName} className="modal-image" />
                <h2>{itemName}</h2>
                <p>Quantity: {itemQuantity}</p>
                <p>{itemDescription}</p>
            </div>

            {/* Render Edit Item Modal */}
            {isEditItemModalOpen && (
                <EditItemModal1
                    item={{ name: itemName, quantity: itemQuantity, description: itemDescription }}
                    onClose={() => setIsEditItemModalOpen(false)} // Close the modal
                    handleEditItemClick={handleEditItemClick}
                />
            )}
        </div>
    );
};

export default InventoryBoxModal1;
