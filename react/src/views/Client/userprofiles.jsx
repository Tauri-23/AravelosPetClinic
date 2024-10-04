import React, { useEffect, useState } from 'react';
import "../../assets/css/app.css";
import "../../assets/css/UserProfile.css";
import { useModal } from '../../contexts/ModalContext';
import axiosClient from '../../axios-client';
import { notify } from '../../assets/js/utils';
import { useStateContext } from '../../contexts/ContextProvider';
import { fetchAllPetsWhereClient } from '../../services/PetServices';
import EditPetModal1 from '../../components/Modals/editPetModal1';

const userprofiles = () => {
  const { showModal } = useModal();
  const { user } = useStateContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedPet, setSelectedPet] = useState(null); // For pet modal
  const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
  const [pets, setPets] = useState(null);

  // Simulate fetching data from the database
  useEffect(() => {
    const getAllPets = async () => {
      try {
        const data = await fetchAllPetsWhereClient(user.id);
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllPets();
  }, []);

  const handlePetClick = (pet) => {
    setSelectedPet(pet); // Set the selected pet to show in modal
    showModal('EditPetModal1', { pet }); // Pass the entire pet object
  };

  const handleEditUserPost = (fname, mname, lname, email, password, bday, gender, address, phone, pic ) => {
    const formData = new FormData();
    formData.append('client', user.id);
    formData.append('fname', user.fname);
    formData.append('mname', user.mname);
    formData.append('lname', user.lname);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('bday', user.bday);
    formData.append('gender', user.gender);
    formData.append('phone', user.phone);
    formData.append('pic', user.pic);

    axiosClient.post('/edit-user', formData)
      .then(({ data }) => {
        if (data.status === 200) {
          notify('success', data.message, 'top-center', 3000);
          setPets(prev =>
            [...prev, data.user]
          );
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch(error => console.error(error));
  };

  const handleAddPetPost = (petName, petType, petBreed, petPic) => {
    const formData = new FormData();
    formData.append('client', user.id);
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('petBreed', petBreed);
    formData.append('pic', petPic);

    axiosClient.post('/add-pet', formData)
      .then(({ data }) => {
        if (data.status === 200) {
          notify('success', data.message, 'top-center', 3000);
          setPets(prev =>
            [...prev, data.pet]
          );
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch(error => console.error(error));
  };

  const handleEditUserClick = () => {
    setIsEditing(true); // Toggle editing state
    setEditData(user); // Set initial edit data to user object
    showModal('EditUserModal1', {user}); // Show the EditUserModal
  };
  
  const handleAddPetClick = () => {
    showModal('AddPetModal1', { handleAddPetPost });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={newProfilePicture || user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="user-info">
            <>
              <h2>{user.fname} {user.mname} {user.lname}</h2>
              <p>Email: {user.email || "n/a"}</p>
              <p>Gender: {user.gender || "n/a"}</p>
              <p>Birthday: {user.birthday || "n/a"}</p>
              <p>Address: {user.address || "n/a"}</p>
              <p>Phone: {user.phone || "n/a"}</p>
              <button onClick={() => handleEditUserClick(user)} className="edit-button">Edit</button>
            </>
        </div>
      </div>

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
          </div>
        </div>
      </div>

    </div>
  );
};

export default userprofiles;