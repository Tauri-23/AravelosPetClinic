import React, { useState } from 'react';
import "../../assets/css/editUserModal.css";
import * as Icon from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useModal } from "../../contexts/ModalContext.jsx";

const EditUserModal = ({ user, detail, onClose }) => {
// Inside your component
const {showModal} = useModal();
const [fname, setFname] = useState(user.fname || '');
const [mname, setMname] = useState(user.mname || '');
const [lname, setLname] = useState(user.lname || '');
const [gender, setGender] = useState(user.gender || '');
const [birthday, setBirthday] = useState(user.birthday || '');
const [phone, setPhone] = useState(user.phone || '');
const [address, setAddress] = useState(user.address || '');

const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture
const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
};
const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Allow input only if it starts with "09" and has a maximum of 11 digits
    if (/^09\d{0,9}$/.test(input)) {
      setPhone(input);
    }
  };
  const genderOptions = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
  ];
  const handleUpdateClicks = () => {
    const handleFunction = "handleUpdateProfile";
    showModal('ConfirmActionModal1', {handlePost: handleUpdatePost, handleFunction});
  };
  const handleUpdatePost = () => {
  };
  const renderContent = () => {
    switch (detail){
        case 'name':
            return(
                <>
                    <div className='bold semi-medium-f anybody t-align-center'>
                        Change Name
                    </div>
                    <hr></hr>
                    <div className="detail-row semi-bold">
                        <div className="label-div">First Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="fname" placeholder="First Name"
                            onChange={handleInputChange(setFname)}
                            value={fname || user.fname}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Middle Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="mname" placeholder="Middle Name (Optional)"
                            onChange={handleInputChange(setMname)}
                            value={mname || user.mname}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Last Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="lname" placeholder="Last Name"
                            onChange={handleInputChange(setLname)}
                            value={lname || user.lname}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Password: </div>
                        <input
                            className='top-margin-s'
                            type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                    </div>

                <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                <div
                onClick={() => {handleUpdateClicks(); onClose();}}
                className="primary-btn-blue1 text-center"
                >
                    Update
                </div>

                <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                    Cancel
                </div>
                </div>
                </>
            )

        case 'email':
            return(
                <>
                    <div className='bold semi-medium-f anybody t-align-center'>
                        Change Email
                    </div>
                    <hr></hr>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Current Email: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            value={user.email} readOnly/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">New Email: </div>
                        <input
                            className='top-margin-s'
                            type="text" placeholder="New Email"/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Re-enter Email: </div>
                        <input
                            className='top-margin-s'
                            type="text" placeholder="Re-enter  Email"/>
                    </div>
                    <div className="detail-row semi-bold" title="Input the OTP sent to your old email.">
                        <div className="label-div align-self-end">One-Time Password: </div>
                            <div className='d-flex w-100'>
                                <input
                                className='top-margin-s align-items-center w-100'
                                type="text" placeholder="One-Time Password" /><button
                                onClick={() => {handleYesConfirmationPost(); onClose();}}
                                className="left-margin-s primary-btn-blue1 text-center align-self-end">Send</button>
                            </div>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Password: </div>
                        <input
                            className='top-margin-s'
                            type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                    </div>

                <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                <div
                onClick={() => {handleUpdateClicks(); onClose();}}
                className="primary-btn-blue1 text-center"
                >
                    Update
                </div>

                <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                    Cancel
                </div>
                </div>
                </>
            )
        case 'birthday':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Birthday
                        </div>
                        <hr></hr>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Birthday: </div>
                            <input
                                className='top-margin-s'
                                type="date"
                            onChange={handleInputChange(setBirthday)}
                                value={birthday || user.birthday} />
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                        </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                    <div
                    onClick={() => {handleUpdateClicks(); onClose();}}
                    className="primary-btn-blue1 text-center"
                    >
                        Update
                    </div>

                    <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                    </div>
                    </>
                )
        case 'phone':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Contact Number
                        </div>
                        <hr></hr>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Contact No.: </div>
                            <input
                                className='top-margin-s'
                                type="tel"
                                pattern="09\d{9}"
                                placeholder='09XXXXXXXXX'
                                title="Contact number must start with 09 and have 11 digits."
                                onChange={handlePhoneChange}
                                value={phone || user.phone}
                            />
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                        </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                    <div
                    onClick={() => {handleUpdateClicks(); onClose();}}
                    className="primary-btn-blue1 text-center"
                    >
                        Update
                    </div>

                    <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                    </div>
                    </>
                )
        case 'address':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Address
                        </div>
                        <hr></hr>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Address: </div>
                            <input
                                className='top-margin-s'
                                type="text"
                                onChange={handleInputChange(setAddress)}
                                value={address || user.address} />
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                        </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                    <div
                    onClick={() => {handleUpdateClicks(); onClose();}}
                    className="primary-btn-blue1 text-center"
                    >
                        Update
                    </div>

                    <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                    </div>
                    </>
                )
        case 'gender':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Gender
                        </div>
                        <hr></hr>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Gender: </div>
                            <select className="select top-margin-s" id="viewType" value={user.gender} onChange={handleInputChange(setGender)}>
                                {genderOptions.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.label}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div">Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                        </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                    <div
                    onClick={() => {handleUpdateClicks(); onClose();}}
                    className="primary-btn-blue1 text-center"
                    >
                        Update
                    </div>

                    <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                    </div>
                    </>
                )
        case 'password':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Password
                        </div>
                        <hr></hr>
                        <div className="detail-row semi-bold">
                            <div className="label-div align-self-end">Current Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Current Password"/>
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div right-padding-ss align-self-end">New Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="New Password"/>
                        </div>
                        <div className="detail-row semi-bold">
                            <div className="label-div align-self-end">Re-enter Password: </div>
                            <input
                                className='top-margin-s'
                                type="password" placeholder="Re-enter Password" title="Re-enter your password to verify changes"/>
                        </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                    <div
                    onClick={() => {handleUpdateClicks(); onClose();}}
                    className="primary-btn-blue1 text-center"
                    >
                        Update
                    </div>

                    <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                    </div>
                    </>
                )
        case 'pfp':
                return(
                    <>
                        <div className='bold semi-medium-f anybody t-align-center'>
                            Change Profile Picture
                        </div>
                        <hr></hr>
                        <div>
                            <div className='d-flex flex-row top-margin-s'>
                                <div className='currentPicCont right-margin left-margin-s'>

                                    {newProfilePicture || user.profilePicture ?
                                    (<img src={newProfilePicture || user.profilePicture} alt="Profile" />) :
                                    (<FontAwesomeIcon icon={faUserCircle} className="user-pic"/>)}

                                </div>
                                <div className='d-flex flex-column inputs right-margin-s  justify-content-center'>
                                    <div className="detail-row semi-bold d-flex flex-column">
                                        <div className="label-div bottom-margin-s">Upload Image: </div>
                                        <input type="file" accept="image/*"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                                <div
                                onClick={() => {handleUpdateClicks(); onClose();}}
                                className="primary-btn-blue1 text-center">
                                    Update
                                </div>

                                <div className="sub-button text-center d-flex gap3 align-items-center justify-content-center"
                                onClick={onClose}>
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </>
                )


    }
}
const modalStyle = {
    width: detail === 'pfp' ? '40vw' : '35vw', // Set desired width for PFP
    maxWidth: '100%', // Ensure it doesn't overflow
};
  return (
    <div className= "modal1 ud-modal">


        {/* Box of modal */}
        <div className="modal-box3 inter" style={modalStyle}>
            <div className="circle-btn1 semi-medium-f" >
                <Icon.X className="pointer" onClick={onClose}/>
            </div>

            {renderContent()}
        </div>


    </div>
  );
};

export default EditUserModal;
