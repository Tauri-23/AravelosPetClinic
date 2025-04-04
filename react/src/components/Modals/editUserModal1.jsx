import React, { useState } from 'react';
import "../../assets/css/editUserModal.css";
import * as Icon from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useModal } from "../../contexts/ModalContext.jsx";
import axiosClient from '../../axios-client.js';
import { notify } from '../../assets/js/utils.jsx';
import { Input } from 'antd';

const EditUserModal = ({ user, setUser, detail, onClose }) => {
// Inside your component
const [fname, setFname] = useState(user.fname);
const [mname, setMname] = useState(user.mname || '');
const [lname, setLname] = useState(user.lname);

const [gender, setGender] = useState(user.gender || '');

const [newEmail, setNewEmail] = useState("");
const [conNewEmail, setConNewEmail] = useState("");

const [birthday, setBirthday] = useState(user.birthday || '');
const [phone, setPhone] = useState(user.phone || '');
const [address, setAddress] = useState(user.address || '');
const [password, setPassword] = useState("");
const [newPass, setNewPass] = useState("");
const [conPass, setConPass] = useState("");

const [newProfilePicture, setNewProfilePicture] = useState(null); // For user's profile picture

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
//   const handleUpdateClicks = () => {
//     const handleFunction = "handleUpdateProfile";
//     showModal('ConfirmActionModal1', {handlePost: handleUpdateInfo});
//   };

  const handleUpdateInfo = (editType) => {
    const formData = new FormData();

    switch(editType) {
        case "name":
            formData.append('fname', fname);
            formData.append('mname', mname);
            formData.append('lname', lname);
            break;
        case "gender":
            formData.append('gender', gender);
            break;
        case "pfp":
            formData.append("newPFP", newProfilePicture);
            break;
        case "phone":
            formData.append("newPhone", phone);
            break;
        case "password":
            console.log("newPass", newPass);
            console.log("conPass", conPass);
            if(conPass != newPass) {
                
                notify("error", "Passwords doesn't match", "top-center", 3000);
                return;
            }
            formData.append("newPassword", newPass);
            break;
        default:
            notify('error', 'Invalid edit type', 'top-center', 3000);
            return;
    }
    formData.append('clientId', user.id);
    formData.append('password', password);
    formData.append('editType', editType);

    axiosClient.post('/update-client-profile', formData)
    .then(({data}) => {
        if(data.status === 200) {
            onClose();
            setUser(data.client);
        }
        notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
    }).catch((error) => console.error(error))
  }

  const renderContent = () => {
    switch (detail){
        // Name
        case 'name':
            return (
                <>
                    <div className='bold semi-medium-f anybody t-align-center'>
                        Change Name
                    </div>
                    <hr/>
                    <div className="detail-row semi-bold">
                        <div className="label-div">First Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="fname" placeholder="First Name"
                            onChange={(e) => setFname(e.target.value)}
                            value={fname}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Middle Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="mname" placeholder="Middle Name (Optional)"
                            onChange={(e) => setMname(e.target.value)}
                            value={mname || ""}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Last Name: </div>
                        <input
                            className='top-margin-s'
                            type="text"
                            name="lname" placeholder="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            value={lname}/>
                    </div>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Password: </div>
                        <input
                            className='top-margin-s'
                            type="password"
                            placeholder="Re-enter Password"
                            title="Re-enter your password to verify changes"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            />
                    </div>

                <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                <div
                onClick={() => {handleUpdateInfo("name");}}
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
                    <hr/>
                    <div className="detail-row semi-bold">
                        <div className="label-div">Gender: </div>
                        <select className="select top-margin-s" id="viewType" value={gender} onChange={(e) => setGender(e.target.value)}>
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
                            type="password"
                            placeholder="Re-enter Password"
                            title="Re-enter your password to verify changes"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                        <div
                        onClick={() => {handleUpdateInfo('gender')}}
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
                        type="text"
                        placeholder="New Email"
                        value={newEmail}
                        onInput={(e) => setNewEmail(e.target.value)}/>
                    </div>

                    <div className="detail-row semi-bold">
                        <div className="label-div">Re-enter Email: </div>
                        <input
                        className='top-margin-s'
                        type="text"
                        placeholder="Re-enter  Email"
                        value={conNewEmail}
                        onInput={(e) => setConNewEmail(e.target.value)}/>
                    </div>
                    <div className="detail-row semi-bold" title="Input the OTP sent to your old email.">
                        <div className="label-div align-self-end">One-Time Password: </div>
                            <div className='d-flex w-100'>
                                <input
                                className='top-margin-s align-items-center w-100'
                                type="text" placeholder="One-Time Password" /><button
                                onClick={() => {handleUpdateInfo("email")}}
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
        case 'phone':
            return(
                <>
                    <div className='bold semi-medium-f anybody t-align-center'>
                        Change Contact Number
                    </div>
                    <hr/>
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
                        <label htmlFor="pass-phone">Password</label>
                        <Input.Password
                            size='large'
                            id='pass-phone'
                            placeholder="Re-enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                <div
                onClick={() => {handleUpdateInfo("phone"); onClose();}}
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
                        Change Contact Number
                    </div>
                    <hr/>
                    <div className="">
                        <label htmlFor="change-pass-new">New Password</label> <br/>
                        <Input.Password
                            size='large'
                            id='change-pass-new'
                            placeholder="Re-enter Password" 
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            />
                    </div>
                    <div className="">
                        <label htmlFor="change-pass-new">Confirm Password</label> <br/>
                        <Input.Password
                            size='large'
                            id='change-pass-new'
                            placeholder="Re-enter Password" 
                            value={conPass}
                            onChange={(e) => setConPass(e.target.value)}
                            />
                    </div>
                    <div className="">
                        <label htmlFor="pass-change">Old Password</label> <br/>
                        <Input.Password
                            size='large'
                            id='pass-change'
                            placeholder="Re-enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
    
                    <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">
                        <div
                        onClick={() => {handleUpdateInfo("password"); onClose();}}
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

                                {newProfilePicture !== null ?
                                (<img src={URL.createObjectURL(newProfilePicture)} alt="Profile" />) :
                                (<img src={`/assets/media/pfp/${user.picture}`} alt="profile picture" />)}

                            </div>
                            <div className='d-flex flex-column inputs right-margin-s  justify-content-center'>
                                <div className="detail-row semi-bold d-flex flex-column">
                                    <div className="label-div bottom-margin-s">Upload Image: </div>
                                    <input type="file" onInput={(e) => setNewProfilePicture(e.target.files[0])} accept="image/*"></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='pass-pfp'>Password: </label><br />
                            <Input.Password
                            size='large'
                            id='pass-pfp'
                            placeholder="Re-enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-flex flex-direction-x flex-row-reverse gap3 top-margin justify-content-between">

                            <div
                            onClick={() => {handleUpdateInfo("pfp"); onClose();}}
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
