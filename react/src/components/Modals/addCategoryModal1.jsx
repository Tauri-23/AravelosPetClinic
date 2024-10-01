import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addCategoryModal1.css"; // Import the CSS file

export default function AddCategoryModal1({ handleAddCategoryPost, onClose }) {
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className={`modal1`}>
      {/* Box of modal */}
      <div className="modal-box3">
        <div className="circle-btn1 semi-medium-f" >
                    <Icon.X onClick={onClose}/>
        </div>

        {/* Header */}
        <div className="text-center mar-bottom-1">
          <div className="text-m1 anybody fw-bold">Add Category</div>
        </div>

        <input
          className="categoryInput"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
        />

        {/* Buttons */}
        <div className="button-container">
          
          
          <div
            className="sub-button"
            onClick={onClose}
          >
            Cancel
          </div>
          <div
            onClick={() => {
              handleAddCategoryPost(newCategory);
              onClose();
            }}
            className="primary-btn-blue1 text-center"
          >
            Yes
          </div>
        </div>
      </div>
    </div>
  );
}
