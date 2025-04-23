import { Button, Input, Select, Steps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { formatToPhilPeso, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import axiosClient from "../../../axios-client";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AdminInventoryAddMedicine() {
    const navigate = useNavigate();

    const {setActiveNavLink} = useOutletContext();

    const [medicineImage, setMedicineImage] = useState(null);
    const [step, setStep] = useState(0);
    const [addingMed, setAddmingMed] = useState(false);
    const [addMedicineIn, setAddMedicineIn] = useState({
        name: "",
        price: 0,
        desc: "",
        measurementUnit: "",
        measurementValue: 0,
        dosageType: "",
        dosageValue: 0,
        toyDeduct: 0,
        smDeduct: 0,
        medDeduct: 0,
        lgDeduct: 0,
    });
    
    const deductionSizes = [
        {name: "toyDeduct", size: "Toy"}, 
        {name: "smDeduct", size: "Small"}, 
        {name: "medDeduct", size: "Medium"}, 
        {name: "lgDeduct", size: "Large"}
    ];



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Inventory Tracking");
    }, []);



    /**
     * Image Handlers
     */
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedicineImage(file);
        }
    };

    const handleInputChange = (e) => {
        setAddMedicineIn(prev => ({...prev, [e.target.name]: e.target.value}));
    }



    /**
     * Check Conditions
     */
    const isBtnDisabled = () => {
        switch(step) {
            case 0:
                return isEmptyOrSpaces(addMedicineIn.name) || addMedicineIn.price < 1 || isEmptyOrSpaces(addMedicineIn.desc);
            case 1:
                return addMedicineIn.measurementUnit === "" || addMedicineIn.measurementValue <= 0 || addMedicineIn.dosageType === "" ||
                addMedicineIn.dosageValue <= 0 || addMedicineIn.toyDeduct <= 0 || addMedicineIn.smDeduct <= 0 ||
                addMedicineIn.medDeduct <= 0 || addMedicineIn.lgDeduct <= 0;
        }
    }



    /**
     * Submit Handlers
     */
    const handleAddPost = () => {
        setAddmingMed(true);

        const formData = new FormData();
        formData.append("addMedicineIn", JSON.stringify(addMedicineIn));
        formData.append("hasMedPic", medicineImage ? true : false);
        formData.append("medPic", medicineImage);

        axiosClient.post("/add-medicine", formData)
        .then(({data}) => {
            setAddmingMed(false);
            if(data.status === 200) {
                navigate("/AdminIndex/InventoryTracking");
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        })
        .catch(error => {
            setAddmingMed(false);
            console.error(error);
            notify("error", "Server Error", "top-center", 3000);
        })
    }



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            <h2 className="fw-bold mar-bottom-1">Add Medicine</h2>
            {/* Right Side - Dropdown and Text Fields */}
            <div>

                <Steps
                current={step}
                labelPlacement="vertical"
                items={[
                    {title: "Medicine Basic Information"},
                    {title: "Dosage and Measurements"},
                    {title: "Finalization"},
                ]}
                className="mar-bottom-1"
                />
                
                {/* Medicine Basic Information */}
                {step === 0 && (
                        <>
                            <label htmlFor="name">Item Name</label>
                            <Input
                            size="large"
                            id="name"
                            name="name"
                            className="mar-bottom-3"
                            value={addMedicineIn.name}
                            onChange={handleInputChange}
                            />
                
                            <label htmlFor="price">Item Price</label>
                            <Input
                            size="large"
                            id="price"
                            name="price"
                            className="mar-bottom-3"
                            value={addMedicineIn.price}
                            onChange={(e) => !isNaN(e.target.value) ? handleInputChange(e) : null}
                            />
                
                            <label htmlFor="desc">Item Description</label>
                            <TextArea
                            rows={4}
                            style={{resize: "none"}}
                            id="desc"
                            name="desc"
                            className="mar-bottom-3"
                            value={addMedicineIn.desc}
                            onChange={handleInputChange}
                            />

                            <label htmlFor="photo">Item Photo</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} name="photo" id="photo" />
                            {medicineImage && (
                                <div>
                                    <img 
                                    className="mar-top-3"
                                    style={{width: 200, height: 200, borderRadius: 10}}
                                    src={URL.createObjectURL(medicineImage)} 
                                    alt="Item Preview" 
                                    />
                                </div>
                            )}
                        </>
                )}
                
        
                {/* Dosage and Measurements */}
                {step === 1 && (
                    <>
                        {/* Measurement */}
                        <div className="d-flex gap3 mar-bottom-2" >
                            <div style={{width: 300}}>
                                <label htmlFor="measurementUnit" className="w-100">Measurement Unit</label>
                                <Select
                                id="measurementUnit"
                                name="measurementUnit"
                                size="large"
                                className="w-100"
                                value={addMedicineIn.measurementUnit}
                                onChange={(value) => handleInputChange({target: {name: "measurementUnit", value: value}})}
                                options={[
                                    {label: "Select Measurement Unit", value: ""},
                                    {label: "ml", value: "ml"},
                                    {label: "mg", value: "mg"},
                                    {label: "g", value: "g"},
                                    {label: "kg", value: "kg"}
                                ]}/>
                            </div>

                            <div style={{width: 200}}>
                                <label htmlFor="measurementValue">Measurement Value</label>
                                <Input
                                size="large"
                                id="measurementValue"
                                name="measurementValue"
                                placeholder="XX"
                                className="w-100"
                                value={addMedicineIn.measurementValue}
                                onChange={(e) => !isNaN(e.target.value) ? handleInputChange(e) : null}
                                />
                            </div>
                        </div>

                        {/* Dosage */}
                        <div className="d-flex gap3 mar-bottom-1" >
                            <div style={{width: 300}}>
                                <label htmlFor="dosageType" className="w-100">Dosage Type</label>
                                <Select
                                id="dosageType"
                                name="dosageType"
                                size="large"
                                className="w-100"
                                value={addMedicineIn.dosageType}
                                onChange={(value) => handleInputChange({target: {name: "dosageType", value: value}})}
                                options={[
                                    {label: "Select Dosage Type", value: ""},
                                    {label: "ml", value: "ml"},
                                    {label: "pcs", value: "pcs"},
                                ]}/>
                            </div>

                            <div style={{width: 200}}>
                                <label htmlFor="dosageValue">Dosage Value</label>
                                <Input
                                size="large"
                                id="dosageValue"
                                name="dosageValue"
                                placeholder="XX"
                                className="w-100"
                                value={addMedicineIn.dosageValue}
                                onChange={(e) => !isNaN(e.target.value) ? handleInputChange(e) : null}
                                />
                            </div>
                        </div>

                        {/* Recommended Dosage Per Size */}
                        {addMedicineIn.dosageType !== "" && (
                            <>
                                <h4>Recommended Dosage By Size ({addMedicineIn.dosageType})</h4>
                                <div className="d-flex flex-direction-y gap3">
                                    {deductionSizes.map(fieldName => (
                                        <div className="d-flex align-items-center gap3">
                                            <label style={{width: 100}} htmlFor={fieldName.name}>{fieldName.size}:</label>
                                            <Input
                                            style={{width: 100}}
                                            id={fieldName.name}
                                            name={fieldName.name}
                                            size="large"
                                            value={addMedicineIn[fieldName.name]}
                                            onChange={(e) => !isNaN(e.target.value) ? handleInputChange(e) : null}
                                            />
                                            <span>{addMedicineIn.dosageType}</span>
                                        </div>
                                    ))}
                                    
                                </div>
                            </>
                        )}
                    </>
                )}


                {/* Finalization */}
                {step === 2 && (
                    <>
                        <h3 className="mar-bottom-1">Finalization</h3>

                        <div className="d-flex flex-direction-y gap3">
                            <div>
                                <span>Medicine Name:</span>
                                <h5 className="fw-bold text-l3">{addMedicineIn.name}</h5>
                            </div>

                            <div>
                                <span>Medicine Price:</span>
                                <h5 className="fw-bold text-l3">{formatToPhilPeso(addMedicineIn.price)}</h5>
                            </div>

                            <div>
                                <span>Description:</span>
                                <h5 className="fw-bold text-l3">{addMedicineIn.desc}</h5>
                            </div>

                            <div className="d-flex align-items-center gap1">
                                <div>
                                    <span>Measurement Unit:</span>
                                    <h5 className="fw-bold text-l3">{addMedicineIn.measurementUnit}</h5>
                                </div>
                                <div>
                                    <span>Measurement Value:</span>
                                    <h5 className="fw-bold text-l3">{addMedicineIn.measurementValue}</h5>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap1">
                                <div>
                                    <span>Dosage Type:</span>
                                    <h5 className="fw-bold text-l3">{addMedicineIn.dosageType}</h5>
                                </div>
                                <div>
                                    <span>Dosage Value:</span>
                                    <h5 className="fw-bold text-l3">{addMedicineIn.dosageValue}</h5>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap1">
                                {deductionSizes.map(size => (
                                    <div>
                                        <span>Dosage Deduction ({size.size}) :</span>
                                        <h5 className="fw-bold text-l3">{addMedicineIn[size.name]}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}


                {/* Button Group */}
                <div className="d-flex align-items-center gap3 mar-top-1">
                    {step > 0 && (
                        <Button 
                        size="large"
                        onClick={() => setStep(prev => --prev)} 
                        >
                            Back
                        </Button>
                    )}
                    {step < 2 && (
                        <Button 
                        size="large"
                        type="primary" 
                        disabled={isBtnDisabled()}
                        onClick={() => setStep(prev => ++prev)} 
                        >
                            Next
                        </Button>
                    )}
                    {step === 2 && (
                        <Button 
                        size="large"
                        type="primary" 
                        disabled={isBtnDisabled() || addingMed}
                        onClick={handleAddPost} 
                        >
                            {addingMed ? "Adding..." : "Add Medicine"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}