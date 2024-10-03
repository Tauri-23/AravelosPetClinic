import React from 'react';
import '../../assets/css/inventoryBoxModal1.css';
import * as Icon from 'react-bootstrap-icons';

const InventoryBoxModal1 = ({ itemName, itemImage, itemQuantity, itemDescription, onClose }) => {
    return (
        <div className="modal2"> {/* Updated modal2 class for consistency */}
            <div className="modal-content1">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X onClick={onClose} />
                </div>
                <div className='modalHeader1 bottom-margin-s bold anybody semi-medium-f'>
                    <span>Item Details</span>
                    <div className='edit-btn-icon'>
                        <img
                            src="/assets/media/icons/edit_btn.svg"
                            alt="Edit"
                            title="Edit Item Details"
                        />
                    </div>
                </div>
                <img src={`/assets/media/items/${itemImage}`} alt={itemName} className="modal-image" />
                <h2>{itemName}</h2>
                <p>Quantity: {itemQuantity}</p>
                <p>{itemDescription}</p>
            </div>
        </div>
    );
};

export default InventoryBoxModal1;
