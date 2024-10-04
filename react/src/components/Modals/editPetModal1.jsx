import { useState } from "react";
import * as Icon from "react-bootstrap-icons"; 
import "../../assets/css/addPetModal1.css";


const EditPetModal1 = ({ pet, onClose }) => {
    const [editPetData, setEditPetData] = useState({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        pic: pet.pic,
        
    });

    const handleInputChange = (e) => {
        setEditPetData({ ...editPetData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Send API request to update pet information
        axiosClient.put(`/update-pet/${pet.id}`, editPetData)
            .then(({ data }) => {
                if (data.status === 200) {
                    notify('success', data.message, 'top-center', 3000);
                    // Update the pet in the user's list
                    setPets(prevPets => prevPets.map(p => p.id === pet.id ? { ...p, ...editPetData } : p));
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
            <form onSubmit={handleSave}>
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
                    <label htmlFor="Picture">Pet Picture:</label>
                    <input type="file" id="petPic" name="petPci" value={editPetData.pic} onChange={handleInputChange} />
                </div>
                <button type="submit" className="save-button">Save</button>
                <button onClick={onClose} className="cancel-button">Cancel</button>
            </form>
           
        </div>
        </div>
    );
};

export default EditPetModal1;