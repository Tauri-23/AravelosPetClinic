import { Button, Checkbox, Input } from "antd";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AdminDosageModal({item, petWeight, handleAssignItem, onClose}) {
    const [selectedDosage, setSelectedDosage] = useState("");
    const [isCustomDosage, setIsCustomDosage] = useState(false);
    const [customDosage, setCustomDosage] = useState(0);

    const dosages = [
        {label: "toy", alterLabel: "2Kg - 4Kg", value: item.toy_deduct}, 
        {label: "small", alterLabel: "4.1Kg - 10Kg", value: item.sm_deduct}, 
        {label: "medium", alterLabel: "10.1Kg - 25Kg", value: item.med_deduct}, 
        {label: "large", alterLabel: "above 25.1Kg", value: item.lg_deduct}
    ];

    const getWeight = () => {
        if(petWeight >= 2 && petWeight <= 4) {
            setSelectedDosage(dosages.find(x => x.label === "toy"));
        } else if(petWeight >= 4.1 && petWeight <= 10) {
            setSelectedDosage(dosages.find(x => x.label === "small"));
        } else if(petWeight >= 10.1 && petWeight <= 25) {
            setSelectedDosage(dosages.find(x => x.label === "medium"));
        } else if (petWeight >= 25.1) {
            setSelectedDosage(dosages.find(x => x.label === "large"));
        }
    }

    useEffect(() => {
        getWeight();
    }, [petWeight]);

    useEffect(() => {
        console.log(selectedDosage);
    }, [selectedDosage]);



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>

                <h4>Select Dosage</h4>

                <Checkbox onChange={(e) => setIsCustomDosage(e.target.checked)} className="mar-bottom-3">Use Custom Dosage</Checkbox>

                {isCustomDosage
                ? (
                    <div>
                        <label htmlFor="customDosage">Custom Dosage</label>
                        <Input
                        id="customDosage"
                        size="large"
                        value={customDosage}
                        onChange={(e) => !isNaN(e.target.value) ? setCustomDosage(e.target.value) : null}
                        />
                    </div>
                )
                : (
                    <div className="d-flex gap3">
                        {dosages.map((dosage, index) => (
                            <Button
                            key={index}
                            size="large"
                            type={selectedDosage.label === dosage.label ? "primary" : "default"}>
                                {dosage.alterLabel}
                            </Button>
                        ))}
                    </div>
                )}
                
                <Button 
                type="primary"
                size="large"
                className="mar-top-1"
                onClick={() => handleAssignItem(item, isCustomDosage, isCustomDosage ? parseFloat(customDosage) : selectedDosage)}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}