import { useState } from "react";
import "../../assets/css/addPetModal1.css";
import { Button, Input, Select } from "antd";
import { useStateContext } from "../../contexts/ContextProvider";


export default function AddPetModal1({ handleAddPetPost, petTypes, onClose }) {
    const {user} = useStateContext();
    const [petIn, setPetIn] = useState({
        client: user.id,
        name: "",
        type: "",
        breed: "",
        gender: "",
        dob: ""
    })
    const [petPic, setPetPic] = useState(null);


    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        setPetIn({...petIn, [e.target.name]: e.target.value});
    }



    /**
     * Render
     */
    return (
        <div className="modal1">
            <div className="modal-box3">
                <h2>Add New Pet</h2>

                <Input
                name="name"
                size="large"
                className="mar-bottom-3"
                value={petIn.name}
                onChange={handleInputChange}
                placeholder="e.g. Browney"/>

                <Select
                    name="type"
                    value={petIn.type}
                    className="mar-bottom-3 w-100"
                    options={[
                        {label: "Select Breed", value: ""},
                        ...petTypes.map((item) => ({label: item.type, value: item.id}))
                    ]}
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={(e) => handleInputChange({target: {name: "type", value: e}})}
                />

                {petIn.type !== "" && (
                    <Select
                    name="breed"
                    value={petIn.breed}
                    className="mar-bottom-3 w-100"
                    options={[
                        {label: "Select Breed", value: ""},
                        ...petTypes.filter(x => x.id === petIn.type)[0].pet_breeds.map((item) => ({label: item.breed, value: item.id}))
                    ]}
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={(e) => handleInputChange({target: {name: "breed", value: e}})}
                    disabled={petIn.type === ""} // Disable until petType is selected
                    />
                )}

                <Select
                name="gender"
                value={petIn.gender}
                className="mar-bottom-3 w-100"
                options={[
                    {label: "Select Gender", value: ""},
                    {label: "Male", value: "Male"},
                    {label: "Female", value: "Female"}
                ]}
                size="large"
                onChange={(e) => handleInputChange({target: {name: "gender", value: e}})}
                />

                <input type="date" name="dob" className="w-100 mar-bottom-3" onChange={handleInputChange}/>

                <input
                className="w-100 mar-bottom-1"
                type="file"
                name="picture"
                placeholder="Pet Picture"
                onChange={(e) => setPetPic(e.target.files[0])}
                />

                <div className="d-flex align-items-center gap3 justify-content-end">

                    <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                        handleAddPetPost(petIn, petPic);
                        onClose();
                    }}
                    className="primary-btn-blue1"
                    >
                        Add Pet
                    </Button>
                    <Button 
                    size="large"
                    onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
