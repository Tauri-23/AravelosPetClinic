import * as Icon from 'react-bootstrap-icons';
import propTypes from 'prop-types';

export const AddAppointmentConfirmationModal1 = ({ handleYesConfirmationPost, onClose }) => {

    // useEffect(() => {console.log(listing);}, listing);
    

    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-box3">
                <div className="circle-btn1 semi-big-f" onClick={onClose}>
                    <Icon.X/>
                </div>

                {/* Desc */}
                <div className="text-center mar-bottom-1 d-flex flex-direction-y gap3">
                    <div className="text-m1 fw-bold w-100">Schedule an Appointment?</div>
                    <div className="text-m2 w-50 m-auto">appointment will be scheduled</div>
                </div>

                {/* Btns */}
                <div className="d-flex flex-direction-y gap3">
                        
                    <div 
                    onClick={() => {handleYesConfirmationPost(); onClose();}} 
                    className="primary-btn-blue1 text-center"
                    >
                        Yes
                    </div>
                    
                    <div className="secondary-btn-black2 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                </div>
            </div>

            
        </div>
    );
};

AddAppointmentConfirmationModal1.propTypes = {
    onClose: propTypes.func.isRequired,
    handleYesConfirmationPost: propTypes.func.isRequired
};