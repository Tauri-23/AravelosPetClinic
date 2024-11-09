import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import DeleteCategoryModal1 from "./deleteCategoryModal1"; // Adjust the path as needed
import EditCategoryConfirmationModal1 from "./editCategoryConfirmationModal1"; // Import the new confirmation modal
import "../../assets/css/editCategoryModal1.css"; // Import the CSS file

export default function EditCategoryModal1({ categories, handleEditCategoryClick, handleDeleteCategoryClick, onClose }) {
  const [_categories, _setCategories] = useState(categories);
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

  const handleEditPost = async() => {
    const result = await handleEditCategoryClick(categoryIdToEdit, newCategoryName);
    if(result) {
      _setCategories((prev) =>
        prev.map((category) =>
            category.id === editingCategoryId
                ? { ...category, name: newCategoryName }
                : category
        )
      );
      setIsConfirmationModalOpen(false);
      setCategoryIdToEdit(null);
      setNewCategoryName("");
      setEditingCategoryId(null);
    }
  }

  const handleDeletePost = async() => {
    const result = await handleDeleteCategoryClick(confirmDeleteId);
    console.log(result);
    if(result) {
      _setCategories((prev) =>
        prev.filter(cat => cat.id !== confirmDeleteId)
      );
      setIsConfirmationModalOpen(false);
      setConfirmDeleteId(null);
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <div className="modal1">
      <div className={`edit-modal-box ${isConfirmationModalOpen || isDeleteModalOpen ? 'closed' : ''}`}>
        <div className="circle-btn1 semi-medium-f">
          <Icon.X className="pointer" onClick={onClose} />
        </div>
        <div className="text-center header mar-bottom-1">
          <div className="text-m1 anybody fw-bold">Edit Categories</div>
        </div>

        <div className="category-list">
          {_categories.map((category) => (
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

          <DeleteCategoryModal1
            onConfirm={handleDeletePost}
            onCancel={() => setIsDeleteModalOpen(false)}
            categoryName={categoryNameToDelete}
          />

      )}

      {/* Edit Category Confirmation Modal */}
      {isConfirmationModalOpen && (

          <EditCategoryConfirmationModal1
            onConfirm={() => {
              handleEditPost();
            }}
            onCancel={() => setIsConfirmationModalOpen(false)}
          />

      )}
    </div>
  );
}
