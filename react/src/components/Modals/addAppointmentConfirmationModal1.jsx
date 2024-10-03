import * as Icon from 'react-bootstrap-icons';
import propTypes from 'prop-types';

export const AddAppointmentConfirmationModal1 = ({ handleYesConfirmationPost, onClose }) => {

    // useEffect(() => {console.log(listing);}, listing);


    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-box3 inter">
                <div className="circle-btn1 semi-medium-f bottom-margin-s" >
                    <Icon.X onClick={onClose}/>
                </div>

                {/* Desc */}
                <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                    <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Schedule an Appointment?</div><hr></hr>
                    <div className="text-m2 w-100 m-auto">An appointment will be requested with the clinic. Proceed?</div>
                </div>

                {/* Btns */}
                <div className="d-flex flex-direction-x flex-row-reverse gap3">

                    <div
                    onClick={() => {handleYesConfirmationPost(); onClose();}}
                    className="primary-btn-blue1 w-100 text-center"
                    >
                        Yes
                    </div>

                    <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
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
