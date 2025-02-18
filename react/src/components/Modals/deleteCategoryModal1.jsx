import React from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/deleteCategoryModal1.css"; // Create your CSS file for styles

export default function DeleteCategoryModal1({ onConfirm, onCancel, categoryName }) {
  return (
      <div className="modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onCancel} />
        </div>
        <div className="text-center anybody mar-bottom-1">
          <h4>Confirm Deletion</h4>
        </div>
        <div className="confirmation-text">
          <p>Are you sure you want to delete the category: <strong>{categoryName}</strong>?</p>
        </div>
        <div className="button-container">
          <button className="primary-btn-blue1" onClick={onConfirm}>Yes, Delete</button>
          <button className="sub-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
  );
}
