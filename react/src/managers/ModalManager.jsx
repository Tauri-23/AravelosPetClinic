import { AddAppointmentConfirmationModal1 } from "../components/Modals/addAppointmentConfirmationModal1";
import AddCategoryModal1 from "../components/Modals/addCategoryModal1";
import AddPetModal1 from "../components/Modals/addPetModal1";
import AppointmentRecordModal1 from "../components/Modals/appointmentRecordModal1";
import DeleteCategoryModal1 from "../components/Modals/deleteCategoryModal1";
import EditCategoryModal1 from "../components/Modals/editCategoryModal1";
import EditPetModal1 from "../components/Modals/editPetModal1";
import InventoryBoxModal1 from "../components/Modals/inventoryBoxModal1";
import { useModal } from "../contexts/ModalContext";


const ModalManager = () => {
    const {modalState, hideModal} = useModal();

    const renderModal = () => {
        switch(modalState.type) {
            /*
            |   AGENT
            */
            // Listings
            case 'AddAppointmentConfirmationModal1':
                return <AddAppointmentConfirmationModal1 {...modalState.props} onClose={hideModal}/>;

            case 'AppointmentRecordModal1':
                    return <AppointmentRecordModal1 {...modalState.props} onClose={hideModal}/>;

            case 'AddCategoryModal1':
                return <AddCategoryModal1 {...modalState.props} onClose={hideModal}/>;

            case 'EditCategoryModal1':
                return <EditCategoryModal1 {...modalState.props} onClose={hideModal}/>;

            case 'AddPetModal1':
                return <AddPetModal1 {...modalState.props} onClose={hideModal}/>;

            case 'InventoryBoxModal1':
                return <InventoryBoxModal1 {...modalState.props} onClose={hideModal}/>;

            case 'DeleteCategoryModal1':
                return <DeleteCategoryModal1     {...modalState.props} onClose={hideModal}/>;

            case 'EditPetModal1': // Add the new EditPetModal1 case
                return <EditPetModal1 {...modalState.props} onClose={hideModal} />;
    


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

export default ModalManager;
