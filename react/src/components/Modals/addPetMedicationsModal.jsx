import { Input } from "antd";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { isEmptyOrSpaces } from "../../assets/js/utils";

const AddPetMedicationsModal = ({handleAddPetMedication, onClose}) => {
    const [medication, setMedication] = useState("");


    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="position-absolute" style={{right: 25}} onClick={onClose}>
                    <XLg size={24}/>
                </div>

                {/* Title */}
                <h3 className="w-100 text-center">
                    Input Medications
                </h3>

                <div className="d-flex flex-direction-y gap4 mar-bottom-1">
                    <label htmlFor="medication">Medication</label>
                    <Input 
                    value={medication}
                    id="medication" 
                    size="large" 
                    placeholder="Input pet medication"
                    onChange={(e) => setMedication(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                    disabled={isEmptyOrSpaces(medication)}
                    className={`primary-btn-blue1 ${isEmptyOrSpaces(medication) ? 'disabled' : ''}`}
                    onClick={() => {handleAddPetMedication(medication); onClose()}}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPetMedicationsModal;