import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/editCategoryModal1.css"; // Import the CSS file

export default function EditCategoryModal1({ categories, handleEditCategoryClick, handleDeleteCategoryClick, onClose }) {
  return (
    <div className="edit-modal">
      <div className="edit-modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X onClick={onClose} />
        </div>

        <div className="text-center mar-bottom-1">
          <div className="text-m1 anybody fw-bold">Edit Categories</div>
        </div>

        {/* List of Categories */}
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <span>{category.name}</span>
              <div className="button-container">
                <img
                  className="small-button edit-btn"
                  src="/assets/media/icons/edit_btn.svg" // Add your edit icon path here
                  alt="Edit"
                  title="Edit Category"
                  onClick={() => handleEditCategoryClick(category.id, category.name)}
                />
                <img
                  className="small-button delete-btn"
                  src="/assets/media/icons/delete.svg" // Add your delete icon path here
                  alt="Delete"
                  title="Delete Category"
                  onClick={() => handleDeleteCategoryClick(category.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
