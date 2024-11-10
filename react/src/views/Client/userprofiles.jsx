import React, { useEffect, useState } from 'react';
import "../../assets/css/app.css";
import "../../assets/css/UserProfile.css";
import { useModal } from '../../contexts/ModalContext';
import axiosClient from '../../axios-client';
import { notify } from '../../assets/js/utils';
import { useStateContext } from '../../contexts/ContextProvider';
import { fetchAllPetsWhereClient } from '../../services/PetServices';
import EditPetModal1 from '../../components/Modals/editPetModal1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as Icon from 'react-bootstrap-icons';

const userprofiles = () => {
  const { showModal } = useModal();
  const { user, setUser } = useStateContext();
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



  const handleAddPetPost = (petName, petType, petGender, petDOB, petBreed, petPic) => {
    const formData = new FormData();
    formData.append('client', user.id);
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('petGender', petGender);
    formData.append('petDOB', petDOB);
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



  const handleEditUserClick = (detailValue) => {
    setIsEditing(true); // Toggle editing state
    setEditData(user); // Set initial edit data to user object
    showModal('EditUserModal1', {user, setUser, detail:detailValue}); // Show the EditUserModal
  };



  const handleAddPetClick = () => {
    showModal('AddPetModal1', { handleAddPetPost });
  };






  // Loading
  if (!user) return <div>Loading...</div>;

  // Return component
  return (
    <div className="page inter">
        <div className="prof gen-margin d-flex ">
            <div className='prof small-form user-profile'>
                <div className="profile-header bottom-padding-s">
                    <div className="profilepic" onClick={()=>handleEditUserClick("pfp")}>
                    {newProfilePicture || user.profilePicture ? (
                        <img src={newProfilePicture || user.profilePicture} alt="Profile" />
                        ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="profilepic"/>
                        )}
                    </div>
                    <div className="user-name semi-medium-f bold anybody">
                        {user.fname} {user.mname} {user.lname}
                        {/* <p>Email: {user.email || "n/a"}</p>
                        <p>Birthday: {user.birthday || "n/a"}</p>
                        <p>Address: {user.address || "n/a"}</p>
                        <p>Phone: {user.phone || "n/a"}</p>
                        <button onClick={() => handleEditUserClick(user)} className="primary-btn-blue1">Update</button> */}

                    </div>

                </div>
                <div className="left-margin top-margin">
                    <div className='user-details'>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Name: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="text" 
                          value={`${user.fname || ''} ${user.mname || ''} ${user.lname || ''}`.trim() || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("name")}/>

                        </div>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Gender: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="text" 
                          value={user.gender || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("gender")}/>

                        </div>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Email: </div>
                          <input 
                          className="left-margin ud detail-cont"  
                          type="text" 
                          value={user.email || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("email")}/>

                        </div>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Birthday: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="text" 
                          value={user.birthday || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("birthday")}/>

                        </div>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Address: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="text" 
                          value={user.address || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("address")}/>

                        </div>
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Phone: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="text" 
                          value={user.phone || 'n/a'} readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("phone")}/>

                        </div>
                        {/* <div className="primary-btn-blue1">Change Password</div> */}
                        {/* <u>Change Password</u> */}
                        <div className='detail-row semi-bold'>
                          <div className="label-div">Password: </div>
                          <input 
                          className="left-margin ud detail-cont" 
                          type="password" 
                          value="********" 
                          readOnly />
                          <Icon.PencilFill className="left-margin-s pointer" onClick={()=>handleEditUserClick("phone")}/>
                        </div>

                    </div>

                </div>
            </div>
            <div className='prof small-form user-pets'>
                <div className="prof header bold anybody semi-medium-f">Pet Profiles</div>
                <div className="pet-profiles">
                    {pets?.length > 0 && pets.map((pet) => (
                        <div
                        key={pet.id}
                        className="pet-profile"
                        onClick={() => handlePetClick(pet)}
                        >
                        <img src={`/assets/media/pets/${pet.picture}`} alt={pet.name} className="pet-picture rounded-corners" />
                        <p>{pet.name}</p>
                        </div>
                    ))}
                    {/* Add New Pet button */}
                    <div className="pet-profile add-pet rounded-corners" onClick={handleAddPetClick}>
                        <div className="add-icon ">+</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default userprofiles;
