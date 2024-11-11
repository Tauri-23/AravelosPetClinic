import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addCategoryModal1.css"; // Import the CSS file
import AddCategoryConfirmationModal1 from "./addCategoryConfirmationModal1"; // Import the confirmation modal

export default function AddCategoryModal1({ handleAddCategoryPost, onClose }) {
  const [newCategory, setNewCategory] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Open the confirmation modal without adding the category
  const handleAddCategory = () => {
    setShowConfirmation(true); // Show the confirmation modal
  };

  // Confirm and add the category
  const handleConfirmAddCategory = () => {
    handleAddCategoryPost(newCategory);
    setShowConfirmation(false); // Close the confirmation modal after confirming
  };

  return (
    <div>
      {/* Main Modal */}
      <div className={`modal1`}>
        <div className="addcat modal-box3">
          <div className="circle-btn1 semi-medium-f">
            <Icon.X className="pointer" onClick={onClose} />
          </div>

          {/* Header */}
          <div className="addcat text-m1 anybody fw-bold border-bottom bottom-margin-s">Add Category</div>

          <input
            className="categoryInput"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />

          {/* Buttons */}
          <div className="addcat button-container">
            <div className="addcat text-center sub-button" onClick={onClose}>
              Cancel
            </div>
            <div onClick={handleAddCategory} className="addcat primary-btn-blue1 text-center">
              Yes
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <AddCategoryConfirmationModal1
          onConfirm={handleConfirmAddCategory} // Pass the confirm handler
          onCancel={() => setShowConfirmation(false)} // Close the confirmation modal
        />
      )}
    </div>
  );
}
