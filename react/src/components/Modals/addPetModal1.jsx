import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addPetModal1.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddPetModal1({ handleAddPetPost, onClose }) {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petDOB, setPetDOB] = useState('');
  const [petPic, setPetPic] = useState('');

  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
];
    return(
        <div className= {`modal2`}>


            {/* Box of modal */}
            <div className="modal-box4">
              <h2>Add New Pet</h2>
              <input
                type="text"
                name="petName"
                placeholder="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
              <input
                type="text"
                name="petType"
                placeholder="Pet Type (e.g., Dog, Cat)"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              />
              <input
                type="text"
                name="petBreed"
                placeholder="Pet Breed"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
              />
              <select
              id="viewType"
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}>
                {genderOptions.map(gender => (
                  <option key={gender.id} value={gender.id}>{gender.label}</option>
                ))}
              </select>
              <DatePicker onChange={(e) => setPetDOB(e.target.value)}
              />
              <input
                type="file"
                name="petPic"
                placeholder="Pet Picture"
                onChange={(e) => setPetPic(e.target.files[0])}
              />
              <button onClick={() => {handleAddPetPost(petName, petType, petGender, petDOB, petBreed, petPic); onClose()}} className="primary-btn-blue1">Add Pet</button>
            <button onClick={onClose} className="sub-button">Close</button>
          </div>


        </div>
    )
}
