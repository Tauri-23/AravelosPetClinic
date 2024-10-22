import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addPetModal1.css";

//import DatePicker from "react-date-picker";
//import "react-datepicker/dist/react-datepicker.css";

export default function AddPetModal1({ handleAddPetPost, onClose }) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petDOB, setPetDOB] = useState(null); // Initialize with null to avoid default date
  const [petPic, setPetPic] = useState("");

  const genderOptions = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
  ];

  const handleDateChange = (date) => {
    setPetDOB(date);
  };

  return (
    <div className={`modal2`}>
      {/* Box of modal */}
      <div className="modal-box4">
        <h2>Add New Pet</h2>
        <input
          className="pet-info-row"
          type="text"
          name="petName"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />
        <input
          type="text"
          className="pet-info-row"
          name="petType"
          placeholder="Pet Type (e.g., Dog, Cat)"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        />
        <input
          type="text"
          className="pet-info-row"
          name="petBreed"
          placeholder="Pet Breed"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
        />
        <div className="pet-info-row">
          <select id="viewType" value={petGender} onChange={(e) => setPetGender(e.target.value)}>
            {genderOptions.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.label}
              </option>
            ))}
          </select>

          <input type="date" onChange={(e) => setPetDOB(e.target.value)}/>
        </div>
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
            handleAddPetPost(petName, petType, petGender, petDOB, petBreed, petPic);
            onClose();
          }}
          className="primary-btn-blue1"
        >
          Add Pet
        </button>
        <button onClick={onClose} className="sub-button">
          Close
        </button>
        </div>
      </div>
    </div>
  );
}
