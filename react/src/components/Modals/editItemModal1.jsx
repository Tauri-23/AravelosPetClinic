import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/editCategoryModal1.css"; // Import the CSS file

export default function EditItemModal1({ item, onClose, handleEditItemClick }) {
  return (
    <div className="edit-modal">
      <div className="edit-modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onClose} />
        </div>

        <div className="text-center mar-bottom-1">
          <div className="text-m1 anybody fw-bold">Edit Item</div>
        </div>

        {/* Item Details */}
        <div className="category-list">
          <div className="category-item">
            <span>Name: {item.name}</span>
          </div>
          <div className="category-item">
            <span>Quantity: {item.quantity}</span>
          </div>
          <div className="category-item">
            <span>Description: {item.description}</span>
          </div>
          <div className="button-container">
            <img
              className="small-button edit-btn"
              src="/assets/media/icons/edit_btn.svg" // Add your edit icon path here
              alt="Edit"
              title="Edit Item"
              onClick={() => handleEditItemClick(item.id, item.name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
