import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AddPetModal1({ handleAddPetPost, onClose }) {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petPic, setPetPic] = useState('');

    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-box3">
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
              <input
                type="file"
                name="petPic"
                placeholder="Pet Picture"
                onChange={(e) => setPetPic(e.target.files[0])}
              />
              <button onClick={() => {handleAddPetPost(petName, petType, petBreed, petPic); onClose()}} className="save-button">Add Pet</button>
            <button onClick={onClose} className="cancel-button">Close</button>
          </div>

            
        </div>
    )
}