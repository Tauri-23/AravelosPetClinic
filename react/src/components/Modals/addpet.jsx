import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AddCategoryModal1({ handleAddCategoryPost, onClose }) {
  const [newCategory, setNewCategory] = useState('');

    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-content">
            {selectedPet ? (
              <>
                <h2>Edit Pet Information</h2>
                <img src={selectedPet.petPicture} alt={selectedPet.petName} className="pet-picture-large" />
                <input
                  type="text"
                  name="petName"
                  value={selectedPet.petName}
                  onChange={handlePetInputChange}
                  placeholder="Pet Name"
                />
                <input
                  type="text"
                  name="petType"
                  value={selectedPet.petType}
                  onChange={handlePetInputChange}
                  placeholder="Pet Type"
                />
                <input
                  type="text"
                  name="petBreed"
                  value={selectedPet.petBreed}
                  onChange={handlePetInputChange}
                  placeholder="Pet Breed"
                />
                <button onClick={handleSavePet} className="save-button">Save</button>
              </>
            ) : (
              <>
                <h2>Add New Pet</h2>
                <input
                  type="text"
                  name="petName"
                  placeholder="Pet Name"
                  value={newPet.petName}
                  onChange={handleModalChange}
                />
                <input
                  type="text"
                  name="petType"
                  placeholder="Pet Type (e.g., Dog, Cat)"
                  value={newPet.petType}
                  onChange={handleModalChange}
                />
                <input
                  type="text"
                  name="petBreed"
                  placeholder="Pet Breed"
                  value={newPet.petBreed}
                  onChange={handleModalChange}
                />
                <button onClick={handleAddPet} className="save-button">Add Pet</button>
              </>
            )}
            <button onClick={handleCloseModal} className="cancel-button">Close</button>
          </div>

            
        </div>
    )
}