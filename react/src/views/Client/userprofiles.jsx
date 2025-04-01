    import React, { useEffect, useState } from 'react';
    import "../../assets/css/app.css";
    import "../../assets/css/UserProfile.css";
    import { useModal } from '../../contexts/ModalContext';
    import axiosClient from '../../axios-client';
    import { notify } from '../../assets/js/utils';
    import { useStateContext } from '../../contexts/ContextProvider';
    import { fetchAllPetsWhereClient } from '../../services/PetServices';
    import { fetchAllAppointmentsWherePetandStatus } from "../../services/AppointmentServices";
    import EditPetModal1 from '../../components/Modals/editPetModal1';
    import { formatDate, formatDateTime } from "../../assets/js/utils";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
    import * as Icon from 'react-bootstrap-icons';
    import { Button,Table} from 'antd';
    import { useOutletContext } from 'react-router-dom';

const userprofiles = () => {
    const { showModal } = useModal();
    const {setActiveNavLink} = useOutletContext();
    const { user, setUser } = useStateContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [selectedPet, setSelectedPet] = useState(null); // For pet modal
    const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
    const [pets, setPets] = useState(null);
    const [history, setHistory] = useState(null);


    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Profile");

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
        setSelectedPet(pet);
        fetchAllAppointmentsWherePetandStatus(pet.id, "Completed")
        .then((appts) => {
            console.log(appts);  // Log the fetched appointments for debugging
            setHistory(appts);   // Set the fetched appointments to the history state
        })
        .catch((error) => console.error(error));
        console.log(appts)
    };
    const handleEditPetClick = (pet) =>{
        showModal('EditPetModal1', { pet });
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

    const historyColumns =[
        {
            title: "Appointment Type",
            render: (_, row) => row.service.service
        },
        {
            title: "Appointment Date",
            render: (_, row) => formatDateTime(row.date_time)
        },

    ]





    // Loading
    if (!user) return <div>Loading...</div>;

    /**
     * Render
     */
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
                                >
                                <div className="position-relative inline-block">
                                    <img onClick={() => handlePetClick(pet)} src={`/assets/media/pets/${pet.picture}`} alt={pet.name} className="pet-picture rounded-corners" />
                                    <Icon.PencilFill size={18} className="peteditbtn shadow position-absolute p-1 rounded full text-white cursor-pointer"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        handleEditPetClick(pet)}
                                    }>
                                    </Icon.PencilFill>
                                </div>
                                <p>{pet.name}</p>
                            </div>
                        ))}
                        {/* Add New Pet button */}
                        <div className="pet-profile add-pet rounded-corners" onClick={handleAddPetClick}>
                            <div className="add-icon ">+</div>
                        </div>
                    </div>
                    <div className="prof header bold anybody semi-medium-f">
                        {selectedPet ? `${selectedPet.name}'s History` : "History"}
                    </div>
                    <div className ="pet-history">
                        <Table
                        columns={historyColumns}
                        dataSource={history?.map((item) => ({...item, key: item.id}))}
                        bordered
                        pagination={{pageSize:2,showQuickJumper: true }}
                        rowClassName="smaller-row"
                        onRow={(record) => ({
                            //onClick: () => navigate(`/AdminIndex/ViewAppointment/${record.id}`)
                        })}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default userprofiles;
