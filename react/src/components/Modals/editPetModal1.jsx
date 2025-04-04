import { useState } from "react";
import * as Icon from "react-bootstrap-icons"; 
import "../../assets/css/addPetModal1.css";
import axiosClient from "../../axios-client";
import { Select } from "antd";
import { notify } from "../../assets/js/utils";


const EditPetModal1 = ({ pet, setPets, onClose }) => {
    const [editPetData, setEditPetData] = useState({
        id: pet.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        gender: pet.gender,
        petPic: null,
    });

    const handleInputChange = (e) => {
        setEditPetData({ ...editPetData, [e.target.name]: e.target.name == "petPic" ? e.target.files[0] : e.target.value });
    };

    const handleSave = () => {

        const {petPic} = editPetData;

        const formData = new FormData();
        formData.append("petData", JSON.stringify(editPetData));
        if(petPic) {
            formData.append("petPic", petPic);
        }
        


        // Send API request to update pet information
        axiosClient.post(`/update-pet`, formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    notify('success', data.message, 'top-center', 3000);
                    // Update the pet in the user's list
                    setPets(prevPets => prevPets.map(p => p.id === pet.id ? { ...p, ...data.pet } : p));
                    onClose();
                } else {
                    notify('error', data.message, 'top-center', 3000);
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="modal2">
        <div className="modal-box4">
            <h2>Edit Pet Information</h2>
            <div>
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={editPetData.name} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" name="type" value={editPetData.type} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="breed">Breed:</label>
                    <input type="text" id="breed" name="breed" value={editPetData.breed} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="gender">Gender:</label>
                    <Select
                    id="gender" 
                    name="gender"
                    size="large"
                    className="w-100"
                    options={[
                        {label: "Male", value: "Male"},
                        {label: "Female", value: "Female"}
                    ]}
                    value={editPetData.gender} 
                    onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="Picture">Pet Picture:</label>
                    <input type="file" id="petPic" name="petPic" value={editPetData.pic} onChange={handleInputChange} />
                </div>
                <button type="submit" onClick={handleSave} className="save-button">Save</button>
                <button onClick={onClose} className="cancel-button">Cancel</button>
            </div>
           
        </div>
        </div>
    );
};

export default EditPetModal1;