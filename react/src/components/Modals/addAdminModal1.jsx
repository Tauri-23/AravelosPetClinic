import React, { useEffect } from 'react'
import { useState } from "react";
import DatePicker from 'react-date-picker';
// import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/addPetModal1.css";
import { fetchAllAdminRoles } from '../../services/AdminTypesServices';
import { isEmptyOrSpaces } from '../../assets/js/utils';
import axiosClient from '../../axios-client';

export default function addAdminModal1({handleAddAdmin, onClose}) {
  // From Database
  const [adminRoles, setAdminRoles] = useState(null);

  // Inputted from form
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminDOB, setAdminDOB] = useState(null);
  const [Gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [pic, setPic] = useState(null);

  // addBtnState
  const [isAddBtnDisabled, setAddBtnDisabled] = useState(true);



  /**
   * Get all data
   */
  useEffect(() => {
    const getAll = async() => {
      try {
        const [adminRolesDb] = await Promise.all([
          fetchAllAdminRoles()
        ]);

        setAdminRoles(adminRolesDb);
      } catch (error) {
       console.error(error); 
      }
    }

    getAll();
  }, []);



  /**
   * Handlers
   */
  const handleDateChange = (date) => {
    setAdminDOB(date);
  };



  /**
   * Checker
   */
  useEffect(() => {
    if(isEmptyOrSpaces(fname) || isEmptyOrSpaces(lname) || 
    isEmptyOrSpaces(email) || isEmptyOrSpaces(password) || 
    isEmptyOrSpaces(adminDOB) || isEmptyOrSpaces(address) || 
    isEmptyOrSpaces(phone) || isEmptyOrSpaces(role) ||
    pic == null) {
      setAddBtnDisabled(true)
    }else {
      setAddBtnDisabled(false);
    }
  }, [fname, lname, email, password, adminDOB, address, phone, role, pic]);



  /**
   * Render
   */
  return (
    <div className={`modal2`}>
      {/* Box of modal */}
      <div className="modal-box4">
        <h2>Add New Admin</h2>
        <div className="pet-info-row">
        
        {/* fname */}
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />

        {/* mname */}
        <input
          type="text"
          name="mname"
          placeholder="Middle Name"
          value={mname}
          onChange={(e) => setMname(e.target.value)}
        />

        {/* lname */}
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        </div>

        {/* Email */}
        <input
          type="email"
          className='pet-row-info margin-bottom'
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="text"
          className='pet-row-info margin-bottom'
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Gender and Bdate */}
        <div className="pet-info-row">
          <select id="viewType" value={Gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="date" onChange={(e) => setAdminDOB(e.target.value)}/>

          {/* <DatePicker
            id="adminDOB"
            selected={adminDOB}
            dateFormat="yyyy/MM/dd"
            placeholderText="Birth Date"
            onChange={handleDateChange}
          /> */}
        </div>

        {/* Phone */}
        <input
          type="number"
          className='pet-row-info margin-bottom'
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Address */}
        <input
          type="text"
          className='pet-row-info margin-bottom'
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Role */}
        <select className="viewType" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          {adminRoles?.map((role) => (
            <option key={role.id} value={role.id}>{role.role}</option>
          ))}

        </select>

        {/* PFP */}
        <input
          className="pet-info-row"
          type="file"
          name="petPic"
          placeholder="Pet Picture"
          onChange={(e) => setPic(e.target.files[0])}
        />


        <div className="pet-info-row">
          <button
          disabled={isAddBtnDisabled}
          onClick={() => {
            handleAddAdmin(fname, mname, lname, email, password, adminDOB, Gender, address, phone, role, pic);
            onClose();
          }}
          className={`primary-btn-blue1 ${isAddBtnDisabled ? 'disabled' : ''}`}
          >
            Add Admin
          </button>

          <button onClick={onClose} className="sub-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



