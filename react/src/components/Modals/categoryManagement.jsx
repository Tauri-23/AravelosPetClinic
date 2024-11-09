import { useState } from "react";
import EditCategoryModal1 from "./editCategoryModal1";
import EditCategoryConfirmationModal1 from "./editCategoryConfirmationModal1";

export default function CategoryManagement({ categories, handleEditCategoryClick, handleDeleteCategoryClick }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openConfirmationModal = (categoryId, name) => {
    setCategoryIdToEdit(categoryId);
    setNewCategoryName(name);
    setIsConfirmationModalOpen(true);
    closeEditModal();
  };

  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleConfirmEdit = async () => {
    const result = await handleEditCategoryClick(categoryIdToEdit, newCategoryName);
    if (result) {
      // Perform any necessary updates here after successful edit
      closeConfirmationModal();
    }
  };

  return (
    <div>
      <button onClick={openEditModal}>Edit Categories</button>

      {isEditModalOpen && (
        <EditCategoryModal1
          categories={categories}
          handleEditCategoryClick={openConfirmationModal}
          handleDeleteCategoryClick={handleDeleteCategoryClick}
          onClose={closeEditModal}
        />
      )}

      {isConfirmationModalOpen && (
        <EditCategoryConfirmationModal1
          onConfirm={handleConfirmEdit}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
}
