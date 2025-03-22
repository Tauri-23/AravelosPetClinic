import { Input } from "antd";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { isEmptyOrSpaces } from "../../assets/js/utils";

const AddPetDiseasesModal = ({handleAddPetDisease, onClose}) => {
    const [disease, setDisease] = useState("");


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
                    Input Diseases
                </h3>

                <div className="d-flex flex-direction-y gap4 mar-bottom-1">
                    <label htmlFor="disease">Disease</label>
                    <Input 
                    value={disease}
                    id="disease" 
                    size="large" 
                    placeholder="Input pet disease"
                    onChange={(e) => setDisease(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                    disabled={isEmptyOrSpaces(disease)}
                    className={`primary-btn-blue1 ${isEmptyOrSpaces(disease) ? 'disabled' : ''}`}
                    onClick={() => {handleAddPetDisease(disease); onClose()}}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPetDiseasesModal;