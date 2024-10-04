import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import DeleteCategoryModal1 from "./deleteCategoryModal1"; // Adjust the path as needed
import EditCategoryConfirmationModal1 from "./editCategoryConfirmationModal1"; // Import the new confirmation modal
import "../../assets/css/editCategoryModal1.css"; // Import the CSS file

export default function EditCategoryModal1({ categories, handleEditCategoryClick, handleDeleteCategoryClick, onClose }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryNameToDelete, setCategoryNameToDelete] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

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

  const handleEditClick = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setNewCategoryName(categoryName);
  };

  const handleSaveEdit = (categoryId) => {
    if (newCategoryName.trim()) {
      setCategoryIdToEdit(categoryId);
      setIsConfirmationModalOpen(true);
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

        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              {editingCategoryId === category.id ? (
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                  className="edit-input"
                />
              ) : (
                <span>{category.name}</span>
              )}
              <div className="editdeletebtns">
                {editingCategoryId === category.id ? (
                  <>
                    <div className="small-button" onClick={() => setEditingCategoryId(null)}>
                      <Icon.X className="pointer" />
                    </div>
                    <button className="edit_savebtn" onClick={() => handleSaveEdit(category.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <div className="small-button" onClick={() => handleEditClick(category.id, category.name)}>
                    <img
                      className="edit-btn"
                      src="/assets/media/icons/edit_btn.svg"
                      alt="Edit"
                      title="Edit Category"
                    />
                  </div>
                )}
                <div className="small-button" onClick={() => handleConfirmDelete(category.id, category.name)}>
                  <img
                    className="delete-btn"
                    src="/assets/media/icons/delete.svg"
                    alt="Delete"
                    title="Delete Category"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <DeleteCategoryModal1
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
            categoryName={categoryNameToDelete}
          />
        </div>
      )}

      {/* Edit Category Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="modal-overlay">
          <EditCategoryConfirmationModal1
            onConfirm={() => {
              handleEditCategoryClick(categoryIdToEdit, newCategoryName);
              setIsConfirmationModalOpen(false);
              setCategoryIdToEdit(null);
              setNewCategoryName("");
            }}
            onCancel={() => setIsConfirmationModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
