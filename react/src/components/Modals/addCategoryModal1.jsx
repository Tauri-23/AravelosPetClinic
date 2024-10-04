import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addCategoryModal1.css"; // Import the CSS file

export default function AddCategoryModal1({ handleAddCategoryPost, onClose }) {
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className={`modal1`}>
      {/* Box of modal */}
      <div className="addcat modal-box3">
        <div className="circle-btn1 semi-medium-f" >
                    <Icon.X className="pointer" onClick={onClose}/>
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


          <div
            className="addcat text-center sub-button"
            onClick={onClose}
          >
            Cancel
          </div>
          <div
            onClick={() => {
              handleAddCategoryPost(newCategory);
              onClose();
            }}
            className="addcat primary-btn-blue1 text-center"
          >
            Yes
          </div>
        </div>
      </div>
    </div>
  );
}
