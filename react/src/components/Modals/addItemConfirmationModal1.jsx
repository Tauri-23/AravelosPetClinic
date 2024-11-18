import React from "react";
import * as Icon from "react-bootstrap-icons";  // Add this import to resolve the error
import "../../assets/css/addItemConfirmationModal1.css";
export default function AddItemConfirmationModal1({ onConfirm, onCancel }) {
  return (
    <div className="add-item-modal">
      <div className="modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onCancel} />
        </div>
        <div className="text-center anybody mar-bottom-1">
          <h4>Confirm Action</h4>
        </div>
        <div className="confirmation-text">
          <p>Are you sure you want to add this item?</p>
        </div>
        <div className="button-group confirm_save">
          <button className="primary-btn-blue1" onClick={onConfirm}>Yes, Add Item</button>
          <button className="sub-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
