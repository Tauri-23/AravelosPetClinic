import { useEffect, useState } from "react";
import "../../assets/css/addPetModal1.css";
import { Select } from "antd";
import { fetchAllDogBreeds } from '../../services/PetServices';
import { fetchAllCatBreeds } from '../../services/PetServices';



//import DatePicker from "react-date-picker";
//import "react-datepicker/dist/react-datepicker.css";

export default function AddPetModal1({ handleAddPetPost, onClose }) {
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("Dog");
    const [petBreed, setPetBreed] = useState("");
    const [petGender, setPetGender] = useState("Male");
    const [petDOB, setPetDOB] = useState(null); // Initialize with null to avoid default date
    const [petPic, setPetPic] = useState("");
    const [breeds, setBreeds] = useState([]);
    const genderOptions = [
        { id: "Male", label: "Male" },
        { id: "Female", label: "Female" },
    ];

    const handleDateChange = (date) => {
        setPetDOB(date);
    };

    useEffect(() => {
        if (!petType) return;

        const fetchBreeds = async () => {
            try {
                let response;
                if (petType === "Dog") {
                    response = await fetchAllDogBreeds();
                } else if (petType === "Cat") {
                    response = await fetchAllCatBreeds();
                }

                // Map the API response to create breed options for the Select component
                const breedOptions = response.map((breed) => ({
                    label: petType === "Dog" ? breed.dog_breed : breed.cat_breed, // Use dog_breed or cat_breed as label
                    value: breed.id, // Use the breed's id as value
                }));

                setBreeds(breedOptions); // Update the state with the breed options
                setPetBreed(""); // Reset breed selection when pet type changes
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        };

        fetchBreeds();
    }, [petType]);
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

            <Select
                value={petType}
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
                onChange={(e) => setPetType(e)}
            />

            <Select
                value={petBreed}
                className="mar-bottom-3"
                style={{ width: "100%" }}
                options={breeds}
                size="large"
                showSearch
                filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => setPetBreed(value)}
                disabled={!petType} // Disable until petType is selected
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
                const breedName = breeds.find(breed => breed.value === petBreed)?.label;
                handleAddPetPost(petName, petType, petGender, petDOB, breedName, petPic);
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
