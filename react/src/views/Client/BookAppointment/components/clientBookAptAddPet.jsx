import { Button, Select } from "antd";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function ClientBookAptAddPet({pets, selectedPets, setSelectedPets, setSelectedServices, onClose}) {
    const [selectedPet, setSelectedPet] = useState("");



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f bottom-margin-s" >
                    <Icon.X className="pointer" onClick={onClose}/>
                </div>
                
                <h3 className="mar-bottom-1">Select Pets</h3>

                <Select
                size="large"
                className="w-100 mar-bottom-1"
                value={selectedPet}
                onChange={(value) => setSelectedPet(value)}
                options={[
                    { label: "Select pet", value: "" },
                    ...pets
                    .filter(pet => !selectedPets.some(selPet => selPet.id === pet.id))
                    .map(pet => ({
                        label: pet.name,
                        value: pet.id
                    }))
                ]}
                />


                <Button
                size="large"
                type="primary"
                disabled={selectedPet === ""}
                onClick={() => {
                    const filteredPet = pets.find(pet => pet.id === selectedPet);
                    setSelectedPets(prev => [...prev, {id: filteredPet.id, name: filteredPet.name}]);
                    setSelectedServices(prev => [...prev, []])//append 1 index
                    onClose();
                }}
                >
                    Select
                </Button>
            </div>
        </div>
    )
}