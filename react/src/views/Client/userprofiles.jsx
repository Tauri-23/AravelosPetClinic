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
import { Button } from 'antd';

const userprofiles = () => {
    const { showModal } = useModal();
    const { user, setUser } = useStateContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [selectedPet, setSelectedPet] = useState(null); // For pet modal
    const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
    const [pets, setPets] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        const getAllPets = async () => {
        try {
            const data = await fetchAllPetsWhereClient(user.id);
            console.log(data);
            setPets(data);
        } catch (error) {
            console.error(error);
        }
        };

        getAllPets();
    }, []);



    /**
     * Handlers
     */
    const handlePetClick = (pet) => {
        setSelectedPet(pet); // Set the selected pet to show in modal
        // showModal('EditPetModal1', { pet }); // Pass the entire pet object
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

    /**
     * 
     * @param {string} mode - (allergy | medication | disease)
     */
    const handleAddPetMedicalHistory = (mode) => {
        switch(mode) {
            // Pet Allergies
            case "allergy":
                showModal("AddPetAllergiesModal", {
                    handleAddPetAllergy: (allergy) => {
                        const formData = new FormData();
                        formData.append('petId', selectedPet.id);
                        formData.append('client', user.id);
                        formData.append('allergy', allergy);


                        axiosClient.post("/add-pet-allergies", formData)
                        .then(({data}) => {
                            console.log(data.pets);
                            if(data.status === 200) {
                                setPets(data.pets);
                                setSelectedPet(data.pets.filter(x => x.id == selectedPet.id)[0]);
                            }
                        }).catch(e => console.error(e));
                    }
                });
                break;
            case "medication":
                showModal("AddPetMedicationsModal", {
                    handleAddPetMedication: (medication) => {
                        const formData = new FormData();
                        formData.append('petId', selectedPet.id);
                        formData.append('client', user.id);
                        formData.append('medication', medication);


                        axiosClient.post("/add-pet-medications", formData)
                        .then(({data}) => {
                            console.log(data.pets);
                            if(data.status === 200) {
                                setPets(data.pets);
                                setSelectedPet(data.pets.filter(x => x.id == selectedPet.id)[0]);
                            }
                        }).catch(e => console.error(e));
                    }
                });
                break;
            case "disease":
                showModal("AddPetDiseasesModal", {
                    handleAddPetDisease: (disease) => {
                        const formData = new FormData();
                        formData.append('petId', selectedPet.id);
                        formData.append('client', user.id);
                        formData.append('disease', disease);

                        
                        axiosClient.post("/add-pet-diseases", formData)
                        .then(({data}) => {
                            console.log(data.pets);
                            if(data.status === 200) {
                                setPets(data.pets);
                                setSelectedPet(data.pets.filter(x => x.id == selectedPet.id)[0]);
                            }
                        }).catch(e => console.error(e));
                    }
                });
                break;
            default:
                return;
        }
    }

    const handleVerifyPhone = () => {
        const formData = new FormData();
        formData.append('client', user.id);
        formData.append('for', 'phone verification');

        axiosClient.post('/client-send-sms-otp', formData)
        .then(({data}) => {
            console.log(data.smsStatus);
            if(data.status === 200) {
                showModal('VerifyPhoneModal');
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => console.error(error));
    }

    const handleVerifyEmail = () => {
        const formData = new FormData();
        formData.append('client', user.id);
        formData.append('for', 'email verification');

        axiosClient.post('/client-send-sms-otp', formData)
        .then(({data}) => {
            console.log(data.smsStatus);
            if(data.status === 200) {
                showModal('VerifyPhoneModal');
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => console.error(error));
    }






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
                            

                            {/*  */}
                            <div className='d-flex w-100 align-items-center gap1 mar-top-1'>
                                <div>Phone: {user.phone}</div>
                                <Button
                                disabled={user.phone_verified}
                                onClick={handleVerifyPhone}
                                type='primary'
                                >
                                    {user.phone_verified ? "Verified" : 'Verify Phone'}
                                </Button>
                            </div>
                            <div className='d-flex w-100 align-items-center gap1 mar-top-3'>
                                <div>email: {user.email}</div>
                                <Button
                                type='primary'
                                >
                                    Verify Email
                                </Button>
                            </div>

                        </div>

                    </div>
                </div>



                {/* PET PROFILE */}
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

                    {/* Pet Medical History */}
                    {(selectedPet !== null) && (
                        <div className='d-flex flex-direction-y gap1' style={{overflowY: "scroll", height: "500px"}}>
                            <h3>Pet Medical History ({selectedPet.name})</h3>

                            {/* Allergies */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Allergies</h5>
                                    <button className="primary-btn-blue1" onClick={() => handleAddPetMedicalHistory("allergy")}>Add Item</button>
                                </div>
                                <div className="d-flex flex-direction-y gap3">
                                    {selectedPet?.allergies.length > 0
                                    ? selectedPet?.allergies.map((allergy, index) => (
                                        <div key={index}>{allergy.allergy}</div>
                                    ))
                                    : (<>No Records</>)}
                                </div>
                            </div>

                            {/* Medications */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Medications</h5>
                                    <button className="primary-btn-blue1" onClick={() => handleAddPetMedicalHistory("medication")}>Add Item</button>
                                </div>
                                <div className="d-flex flex-direction-y gap3">
                                    {selectedPet?.medications.length > 0
                                    ? selectedPet?.medications.map((medication, index) => (
                                        <div key={index}>{medication.medication}</div>
                                    ))
                                    : (<>No Records</>)}
                                </div>
                            </div>

                            {/* Diseases */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Diseases / Conditions</h5>
                                    <button className="primary-btn-blue1" onClick={() => handleAddPetMedicalHistory("disease")}>Add Item</button>
                                </div>
                                <div className="d-flex flex-direction-y gap3">
                                    {selectedPet?.diseases.length > 0
                                    ? selectedPet?.diseases.map((disease, index) => (
                                        <div key={index}>{disease.disease}</div>
                                    ))
                                    : (<>No Records</>)}
                                </div>
                                
                            </div>

                            {/* Vaccinations */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Vaccinations</h5>
                                    <button className="primary-btn-blue1" onClick={() => handleAddPetMedicalHistory()}>Add Item</button>
                                </div>
                                No Records
                            </div>

                        </div>
                    )}
                    
                </div>

            </div>
        </div>
    );
};

export default userprofiles;
