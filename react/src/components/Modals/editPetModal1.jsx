import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/addPetModal1.css";
import axiosClient from "../../axios-client";
import { Select } from "antd";
import { notify } from "../../assets/js/utils";
import { useEffect } from "react";
import { fetchAllDogBreeds } from '../../services/PetServices';
import { fetchAllCatBreeds } from '../../services/PetServices';

const EditPetModal1 = ({ pet, onClose }) => {
    const genderOptions = [
        { id: "Male", label: "Male" },
        { id: "Female", label: "Female" },
    ];
    const [breeds, setBreeds] = useState([]);
    const [petType, setPetType] = useState("Dog");
    const [editPetData, setEditPetData] = useState({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        pic: pet.pic,
        gender: pet.gender,
        dob: pet.dob,

    });
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA GAIN
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPetData((prevState) => ({
            ...prevState,
            [name]: value, // Update state with the new value
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setEditPetData((prevState) => ({
            ...prevState,
            pic: file, // Update the state with the new file
        }));
    };
    const handleSave = () => {
        axiosClient.put(`/update-pet/${pet.id}`, editPetData)
            .then(({ data }) => {
                if (data.status === 200) {
                    notify('success', data.message, 'top-center', 3000);
                    // Close modal after saving
                    onClose();
                } else {
                    notify('error', data.message, 'top-center', 3000);
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if (!editPetData.type) return;

        const fetchBreeds = async () => {
            try {
                let response;
                if (editPetData.type === "Dog") {
                    response = await fetchAllDogBreeds();
                } else if (editPetData.type === "Cat") {
                    response = await fetchAllCatBreeds();
                }

                // Map the API response to create breed options for the Select component
                const breedOptions = response.map((breed) => ({
                    label: editPetData.type === "Dog" ? breed.dog_breed : breed.cat_breed, // Use dog_breed or cat_breed as label
                    value: breed.id, // Use the breed's id as value
                }));

                setBreeds(breedOptions);
                setEditPetData((prevState) => ({
                    ...prevState,
                    breed: breedOptions.length > 0 ? breedOptions[0].value : "", // Set default breed
                }));
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        };

        fetchBreeds();
    }, [editPetData.type]);

    return (
        <div className={`modal2`}>
        {/* Box of modal */}
        <div className="modal-box4">
            <h2>Add New Pet</h2>
            <input
            className="pet-info-row"
            type="text"
            name="name"
            placeholder="Pet Name"
            value={editPetData.name}
            onChange={handleInputChange}
            />

            <Select
                value={editPetData.type}
                className="mar-bottom-3"
                style={{width: "100%"}}
                options={[
                    {label: "Cat", value: "Cat"},
                    {label: "Dog", value: "Dog"}
                ]}
                size="large"
                showSearch
                filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => setEditPetData((prevState) => ({
                    ...prevState,
                    type: value,
                }))}
            />

            <Select
                value={editPetData.breed}
                className="mar-bottom-3"
                style={{ width: "100%" }}
                options={breeds}
                size="large"
                showSearch
                filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => setEditPetData((prevState) => ({
                    ...prevState,
                    breed: value, // Update breed when user selects a different breed
                }))}
                disabled={!editPetData.type} // Disable until petType is selected
            />

            <div className="pet-info-row">
            <select
            id="viewType"
            name="gender"
            value={editPetData.gender}
            onChange={handleInputChange}>
                {genderOptions.map((gender) => (
                <option key={gender.id} value={gender.id}>
                    {gender.label}
                </option>
                ))}
            </select>

            <input type="date" name="dob" onChange={handleInputChange} value={editPetData.dob}/>
            </div>


                <input
                    className="pet-info-row"
                    type="file"
                    name="pic"
                    onChange={handleFileChange}
                />
            <div className="pet-info-row">
            <button
                        onClick={() => {
                            handleSave();
                            onClose();
                        }}
                        className="primary-btn-blue1"
                    >
                        Save Changes
                    </button>
            <button onClick={onClose} className="sub-button">
            Close
            </button>
            </div>
        </div>
        </div>
    );
};

export default EditPetModal1;
