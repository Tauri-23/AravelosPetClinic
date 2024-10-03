import React, { useEffect, useState } from 'react';
import "../../assets/css/app.css";
import "../../assets/UserProfile.css";
import { useModal } from '../../contexts/ModalContext';
import axiosClient from '../../axios-client';
import { notify } from '../../assets/js/utils';
import { useStateContext } from '../../contexts/ContextProvider';
import { fetchAllPetsWhereClient } from '../../services/PetServices';

const userprofiles = () => {
  const {showModal} = useModal();
  const {user} = useStateContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedPet, setSelectedPet] = useState(null); // For pet modal
  const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
  const [pets, setPets] = useState(null);

  // Simulate fetching data from the database
  useEffect(() => {
    const getAllPets = async() => {
      try {
        const data = await fetchAllPetsWhereClient(user.id);
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    }

    getAllPets();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePicture(imageUrl);
      setEditData({ ...editData, profilePicture: imageUrl });
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet); // Set the selected pet to show in modal
    setShowModal(true);
  };

  const handleAddPetPost = (petName, petType, petBreed, petPic) => {
    const formData = new FormData();
    formData.append('client', user.id);
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('petBreed', petBreed);
    formData.append('pic', petPic);

    axiosClient.post('/add-pet', formData)
    .then(({data}) => {
      if(data.status === 200) {
        notify('success', data.message, 'top-center', 3000);
        setPets(prev =>
          [...prev, data.pet]
        )
      } else {
        notify('error', data.message, 'top-center', 3000);
      }
    }).catch(error => console.error(error));

  }

  const handleAddPetClick = () => {
    showModal('AddPetModal1', {handleAddPetPost});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null); // Clear the selected pet on close
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={newProfilePicture || user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="user-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="edit-input"
              />
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              <button onClick={handleSave} className="save-button">Save</button>
            </>
          ) : (
            <>
              <h2>{user.fname} {user.mname} {user.lname}</h2>
              <p>Email: {user.email}</p>
              <p>Gender: {user.gender}</p>
              <p>Birthday: {user.birthday}</p>
              <p>Address: {user.address}</p>
              <p>Phone: {user.phone}</p>
              <button onClick={toggleEditMode} className="edit-button">Edit</button>
            </>
          )}
        </div>
      </div>

      <hr />

      <div className="pet-profiles">
        <h3>Your Pets</h3>
        <div className="pets-container">
          {pets?.length > 0 && pets.map((pet) => (
            <div
              key={pet.id}
              className="pet-profile"
              onClick={() => handlePetClick(pet)}
            >
              <img src={`/assets/media/pets/${pet.picture}`} alt={pet.name} className="pet-picture" />
              <p>{pet.name}</p>
            </div>
          ))}
          {/* Add New Pet button */}
          <div className="pet-profile add-pet" onClick={handleAddPetClick}>
            <div className="add-icon">+</div>
            <p>Add New Pet</p>
          </div>
        </div>
      </div>

      {/* Modal for adding/editing pets */}
      {/* {showModal && (
        <div className="modal">
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
      )} */}
    </div>
  );
};

export default userprofiles;
