import React from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/editItemConfirmationModal1.css"; // Create a corresponding CSS file

export default function EditItemConfirmationModal1({ onConfirm, onCancel }) {
  return (
    <div className="edit-confirmation-modal">
      <div className="modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onCancel} />
        </div>
        <div className="text-center anybody mar-bottom-1">
          <h4>Confirm Changes</h4>
        </div>
        <div className="confirmation-text">
          <p>Are you sure you want to save the changes to this item?</p>
        </div>
        <div className="button-container confirm_save">
            <button className="confirm-save-button" onClick={onConfirm}>Yes, Save Changes</button>
             <button className="cancel-save-button" onClick={onCancel}>Cancel</button>
        </div>

      </div>
    </div>
  );
}
