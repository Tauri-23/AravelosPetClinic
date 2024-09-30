import { AddAppointmentConfirmationModal1 } from "../components/Modals/addAppointmentConfirmationModal1";
import { useModal } from "../contexts/ModalContext";

const ModalManager = () => {
    const {modalState, hideModal} = useModal();

    const renderModal = () => {
        switch(modalState.type) {
            /*
            |   AGENT
            */
            // Listings
            case 'AgentDelListingConfirmationModal1':
                return <AddAppointmentConfirmationModal1 {...modalState.props} onClose={hideModal}/>;



            /*
            |   DEFAULT
            */
            default:
                return null;
        }
    };

    return(
        <>
            {renderModal()}
        </>
    )
}

export default ModalManager