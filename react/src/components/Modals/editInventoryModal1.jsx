import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/editInventoryModal.css"

export default function EditInventoryModal1({inventory, handleEditMedPost, onClose}) {
    const mesurementUnits = ["ml", "cc", "mg", "mcg", "g", "kg"];
    const [editMedicine, setEditMedicine] = useState({
        id: inventory.id,
        name: inventory.name,
        desc: inventory.desc,
        hasMeasurement: inventory.measurement_unit ? true : false,
        measurementVal: inventory.measurement_value,
        measurementUnit: inventory.measurement_unit,
        pic: null
    });



    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        const value = e.target.name === "hasMeasurement" ? e.target.checked : (e.target.name === "pic" ? e.target.files[0] : e.target.value);

        setEditMedicine({
            ...editMedicine,
            [e.target.name]: value
        });
    }



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="edit-inv">
                <div className="form-header">
                    <div className="circle-btn1 semi-medium-f">
                        <Icon.X className="pointer" onClick={onClose} />
                    </div>
                    <h3>Edit Medicine</h3>
                </div>
                <div  className="form-section">
                    <label htmlFor="name" style={{marginTop: "30px"}}>Name</label>
                    <input type="text" name="name" id="name" value={editMedicine.name} onChange={handleInputChange} />

                    <label htmlFor="desc" style={{marginTop: "10px"}}>Description</label>
                    <textarea
                    name="desc"
                    id="desc"
                    style={{marginBottom: "20px"}}
                    value={editMedicine.desc}
                    onInput={handleInputChange}
                    />

                    <Checkbox
                    checked={editMedicine.hasMeasurement}
                    onChange={handleInputChange}
                    name="hasMeasurement"
                    >
                        Measurement
                    </Checkbox><br/>

                    {editMedicine.hasMeasurement && (
                        <>
                            <label htmlFor="measurementUnit" className="mar-end-3"style={{marginTop: "30px"}}>Measurement Unit</label>
                            <Select
                            style={{width: "80px"}}
                            size="large" className="mar-end-3"
                            name="measurementUnit"
                            id="measurementUnit"
                            value={editMedicine.measurementUnit}
                            onChange={(value) => handleInputChange({target:{name: "measurementUnit", value: value}})}
                            options={[
                                ...mesurementUnits.map(item => ({label: item, value: item}))
                            ]}
                            />

                            <label htmlFor="measurementVal"  className="mar-end-3"style={{marginTop: "30px"}}>Measurement Value</label>
                            <input type="number" style={{width: "70px"}}name="measurementVal" id="measurementVal" value={editMedicine.measurementVal} onChange={handleInputChange} />
                        </>
                    )}
                    {/* {measurementRequired && ( */}
                        <div className="measure-weight flex-column align-items-start">
                            <label className='mar-top-2'>Dosage Settings  <Icon.InfoCircle className="mar-start-3" title="Left: standard values, Right: custom values"/></label>
                            <label>
                                Use custom measurements?
                                <input type="checkbox"
                                    // checked={customMeasurementRequired}
                                    // onChange={() => setCustomMeasurementRequired(!customMeasurementRequired)}
                                    />
                            </label>

                            {/* {measurementRequired && ( */}
                                <div>
                                    <div className="d-flex flex-column gap3">
                                        <div className="d-flex align-items-center"><label className="weight-label mar-end-3">XS</label>
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                className="weight-width"
                                                readOnly
                                            />
                                            {/* {customMeasurementRequired &&( */}
                                                <div className='mar-start-3'>
                                                    :
                                                    <input
                                                        type="number"
                                                        placeholder="Value"
                                                        className="weight-width mar-start-3"
                                                    />
                                                </div>
                                            {/* )} */}
                                        </div>
                                        <div className="d-flex align-items-center"><label className="weight-label mar-end-3">S</label>
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                className="weight-width"
                                                readOnly
                                            />
                                            {/* {customMeasurementRequired &&( */}
                                                <div className='mar-start-3'>
                                                    :
                                                    <input
                                                        type="number"
                                                        placeholder="Value"
                                                        className="weight-width mar-start-3"
                                                    />
                                                </div>
                                            {/* )} */}
                                        </div>
                                        <div className="d-flex align-items-center"><label className="weight-label mar-end-3">M</label>
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                className="weight-width"
                                                readOnly
                                            />
                                            {/* {customMeasurementRequired &&( */}
                                                <div className='mar-start-3'>
                                                    :
                                                    <input
                                                        type="number"
                                                        placeholder="Value"
                                                        className="weight-width mar-start-3"
                                                    />
                                                </div>
                                            {/* )} */}
                                        </div>
                                        <div className="d-flex align-items-center"><label className="weight-label mar-end-3">L</label>
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                className="weight-width"
                                                readOnly
                                            />
                                            {/* {customMeasurementRequired &&( */}
                                                <div className='mar-start-3'>
                                                    :
                                                    <input
                                                        type="number"
                                                        placeholder="Value"
                                                        className="weight-width mar-start-3"
                                                    />
                                                </div>
                                            {/* )} */}
                                        </div>
                                        <div className="d-flex align-items-center"><label className="weight-label mar-end-3">XL</label>
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                className="weight-width"
                                                readOnly
                                            />
                                            {/* {customMeasurementRequired &&( */}
                                                <div className='mar-start-3'>
                                                    :
                                                    <input
                                                        type="number"
                                                        placeholder="Value"
                                                        className="weight-width mar-start-3"
                                                    />
                                                </div>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            {/* )} */}
                        </div>
                    {/* )} */}

                    <label htmlFor="pic" style={{marginTop: "30px"}}>Picture</label>
                    <input type="file" name="pic" id="pic" onChange={handleInputChange} />

                    <button className="primary-btn-blue1" style={{marginTop: "30px"}} onClick={() => {handleEditMedPost(editMedicine); onClose();}}>Edit</button>
                </div>
            </div>
        </div>
    )
}
