import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/editItemModal1.css"; // Import the CSS file
import EditItemConfirmationModal1 from "./editItemConfirmationModal1"; // Import the confirmation modal

export default function EditItemModal1({ item, onClose, onCloseParent, handleSaveChangesClick }) {
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for the confirmation modal

  const [_itemName, _setItemName] = useState(item.name);
  const [_itemQuantity, _setItemQuantity] = useState(item.quantity);
  const [_itemDescription, _setItemDescription] = useState(item.description);

  // Trigger the confirmation modal
  const handleSaveClick = () => {
    setShowConfirmation(true); // Show the confirmation modal
  };

  // Confirm and save changes
  const handleConfirmSave = () => {
    handleSaveChangesClick(item.id, _itemName, _itemQuantity, _itemDescription); // Save the item changes
    setShowConfirmation(false); // Close the confirmation modal
    onClose(); // Close the edit modal (optional)
    onCloseParent();
  };

  // Cancel the confirmation modal
  const handleCancelSave = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-box">
          <div className="circle-btn1 semi-medium-f">
            <Icon.X className="pointer" onClick={onClose} />
          </div>

          <div className="text-center mar-bottom-1">
            <div className="text-m1 anybody fw-bold">Edit Item</div>
          </div>

          {/* Item Details with editable inputs */}
          <div className="category-list">
            <div className="category-item">
              <span>Name: </span>
              <input
                type="text"
                name="name"
                value={_itemName}
                onChange={(e) => _setItemName(e.target.value)}
                className="edit-input"
              />
            </div>
            <div className="category-item">
              <span>Quantity: </span>
              <input
                type="number"
                name="quantity"
                value={_itemQuantity}
                onChange={(e) => _setItemQuantity(e.target.value)}
                className="edit-input"
              />
            </div>
            <div className="category-item">
              <span>Description: </span>
              <textarea
                name="description"
                value={_itemDescription}
                onChange={(e) => _setItemDescription(e.target.value)}
                className="edit-input"
              />
            </div>

            {/* Save Changes Button */}
            <div className="savebutton">
              <button
                className="editItemsave"
                onClick={handleSaveClick} // Show the confirmation modal
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <EditItemConfirmationModal1
          onConfirm={handleConfirmSave} // Save the changes if confirmed
          onCancel={handleCancelSave} // Close the confirmation modal on cancel
        />
      )}
    </div>
  );
}
