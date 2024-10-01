import React, { useEffect, useState } from 'react';
import "../../assets/css/app.css";
import "../../assets/UserProfile.css";

const userprofiles = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false); // For any modal visibility
  const [selectedPet, setSelectedPet] = useState(null); // For pet modal
  const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
  const [newPet, setNewPet] = useState({ petName: '', petType: '', petBreed: '', petPicture: '' }); // For new pet details

  // Simulate fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      const userData = {
        profilePicture: 'https://via.placeholder.com/150',
        name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        birthday: '1990-01-01',
        address: '123 Main St, Springfield, USA',
        phone: '+1 123-456-7890',
        pets: [
          { petId: 1, petPicture: 'https://via.placeholder.com/100', petName: 'Chuchay', petType: 'Dog', petBreed: 'Golden Retriever' },
          { petId: 2, petPicture: 'https://via.placeholder.com/100', petName: 'Mark', petType: 'Cat', petBreed: 'Siamese' },
        ],
      };
      setUser(userData);
      setEditData(userData);
    };

    fetchData();
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

  const handlePetInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPet({ ...selectedPet, [name]: value });
  };

  const handleSavePet = () => {
    const updatedPets = user.pets.map((pet) =>
      pet.petId === selectedPet.petId ? selectedPet : pet
    );
    setUser({ ...user, pets: updatedPets });
    setShowModal(false); // Close the modal after saving
  };

  const handleAddPetClick = () => {
    setSelectedPet(null); // Reset selected pet (new pet mode)
    setShowModal(true); // Open modal for adding a new pet
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleAddPet = () => {
    if (!newPet.petName || !newPet.petType || !newPet.petBreed) {
      alert('Please fill all fields');
      return;
    }

    const petId = user.pets.length + 1;
    const newPetData = {
      petId,
      petPicture: 'https://via.placeholder.com/100', // Placeholder for now
      ...newPet,
    };

    setUser({ ...user, pets: [...user.pets, newPetData] });
    setShowModal(false); // Close the modal after adding the pet
    setNewPet({ petName: '', petType: '', petBreed: '', petPicture: '' }); // Reset the form
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
              <h2>{user.name}</h2>
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
          {user.pets.map((pet) => (
            <div
              key={pet.petId}
              className="pet-profile"
              onClick={() => handlePetClick(pet)}
            >
              <img src={pet.petPicture} alt={pet.petName} className="pet-picture" />
              <p>{pet.petName}</p>
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
      {showModal && (
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
      )}
    </div>
  );
};

export default userprofiles;
