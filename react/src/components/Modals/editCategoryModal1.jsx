import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import DeleteCategoryModal1 from "./deleteCategoryModal1"; // Adjust the path as needed
import "../../assets/css/editCategoryModal1.css"; // Import the CSS file

export default function EditCategoryModal1({ categories, handleEditCategoryClick, handleDeleteCategoryClick, onClose }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryNameToDelete, setCategoryNameToDelete] = useState("");

  const handleConfirmDelete = (categoryId, categoryName) => {
    setConfirmDeleteId(categoryId);
    setCategoryNameToDelete(categoryName);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (confirmDeleteId) {
      handleDeleteCategoryClick(confirmDeleteId);
      setConfirmDeleteId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-box">
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onClose} />
        </div>
        <div className="text-center header mar-bottom-1">
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
                  src="/assets/media/icons/edit_btn.svg"
                  alt="Edit"
                  title="Edit Category"
                  onClick={() => handleEditCategoryClick(category.id, category.name)}
                />
                <img
                  className="small-button delete-btn"
                  src="/assets/media/icons/delete.svg"
                  alt="Delete"
                  title="Delete Category"
                  onClick={() => handleConfirmDelete(category.id, category.name)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal with Overlay */}
      {isDeleteModalOpen && (
        <div className="modal-overlay"> {/* Modal overlay */}
          <DeleteCategoryModal1
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
            categoryName={categoryNameToDelete}
          />
        </div>
      )}
    </div>
  );
}
