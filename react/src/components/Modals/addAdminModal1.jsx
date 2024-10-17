import React from 'react'
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/addPetModal1.css";

export default function addAdminModal1({handleAddAdmin, onClose}) {
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminDOB, setAdminDOB] = useState(null);
    const [Gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [Pic, setPic] = useState("");

    const genderOptions = [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ];

    const handleDateChange = (date) => {
      setadminDOB(date);
    };

    const roleOptions = [
        { value: "Veterinarian", label: "Veterinarian" },
        { value: "Veterinary_Assistant", label: "Veterinary Assistant" },
        { value: "Secretary", label: "Secretary" },
        { value: "Kennel_Assistant", label: "Kennel Assistant" },
        { value: "Groomer", label: "Groomer" },
        { value: "Main_Admin", label: "Main Admin" },
    ];
    return (
      <div className={`modal2`}>
        {/* Box of modal */}
        <div className="modal-box4">
          <h2>Add New Admin</h2>
          <div className="pet-info-row">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            name="mname"
            placeholder="Middle Name"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          </div>
          <input
            type="email"
            className='pet-row-info margin-bottom'
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className='pet-row-info margin-bottom'
            name="password"
            placeholder="Password"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pet-info-row">
            <select id="viewType" value={Gender} onChange={(e) => setGender(e.target.value)}>
              {genderOptions.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.label}
                </option>
              ))}
            </select>

            <DatePicker
              id="adminDOB"
              selected={adminDOB}
              dateFormat="yyyy/MM/dd"
              placeholderText="Birth Date"
              onChange={handleDateChange}
            />
          </div>
          <input
            type="number"
            className='pet-row-info margin-bottom'
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
           <select id="viewType" value={role} onChange={(e) => setRole(e.target.value)}>
              {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}

            </select>
          <input
            className="pet-info-row"
            type="file"
            name="petPic"
            placeholder="Pet Picture"
            onChange={(e) => setPetPic(e.target.files[0])}
          />
          <div className="pet-info-row">
          <button
            onClick={() => {
              const formattedDOB = petDOB ? petDOB.toISOString().split("T")[0] : null;
              handleAddPetPost(petName, petType, petGender, formattedDOB, petBreed, petPic);
              onClose();
            }}
            className="primary-btn-blue1"
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



