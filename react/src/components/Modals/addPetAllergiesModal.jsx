import { Input } from "antd";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { isEmptyOrSpaces } from "../../assets/js/utils";

const AddPetAllergiesModal = ({handleAddPetAllergy, onClose}) => {
    const [allergy, setAllergy] = useState("");


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
                    Input Allergies
                </h3>

                <div className="d-flex flex-direction-y gap4 mar-bottom-1">
                    <label htmlFor="allergy">Allergy</label>
                    <Input 
                    value={allergy}
                    id="allergy" 
                    size="large" 
                    placeholder="Input pet allergy"
                    onChange={(e) => setAllergy(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                    disabled={isEmptyOrSpaces(allergy)}
                    className={`primary-btn-blue1 ${isEmptyOrSpaces(allergy) ? 'disabled' : ''}`}
                    onClick={() => {handleAddPetAllergy(allergy); onClose()}}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPetAllergiesModal;