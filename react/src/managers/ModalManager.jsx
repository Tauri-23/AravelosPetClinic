import { AddAppointmentConfirmationModal1 } from "../components/Modals/addAppointmentConfirmationModal1";
import AddCategoryModal1 from "../components/Modals/addCategoryModal1";
import AddPetModal1 from "../components/Modals/addPetModal1";
import AppointmentRecordModal1 from "../components/Modals/appointmentRecordModal1";
import AppointmentRecordModalAdmin1 from "../components/Modals/appointmentRecordModalAdmin1";
import { ConfirmActionModal1 } from "../components/Modals/confirmActionModal1";
import DeleteCategoryModal1 from "../components/Modals/deleteCategoryModal1";
import EditCategoryConfirmationModal1 from "../components/Modals/editCategoryConfirmationModal1";
import EditCategoryModal1 from "../components/Modals/editCategoryModal1";
import EditItemConfirmationModal1 from "../components/Modals/editItemConfirmationModal1";
import EditItemModal1 from "../components/Modals/editItemModal1";
import EditPetModal1 from "../components/Modals/editPetModal1";
import InventoryBoxModal1 from "../components/Modals/inventoryBoxModal1";
import { useModal } from "../contexts/ModalContext";
import EditUserModal1 from "../components/Modals/editUserModal1";
import FeedbackModal1 from "../components/Modals/feedbackModal1";
import AddItemConfirmationModal1 from "../components/Modals/addItemConfirmationModal1";
import TransactionDetailsModal1 from '../components/Modals/transactionDetailsModal1.jsx';
import AdminShowAppointment from "../components/Modals/adminshowappointment.jsx";
import AddCategoryConfirmationModal1 from "../components/Modals/addCategoryConfirmationModal1.jsx";
import AddInventoryItemsModal1 from "../components/Modals/addInventoryItemModal1.jsx";
import GeneralConfirmationModal from "../components/Modals/general_confirmation_modal1.jsx";
import AdminViewAccountInfo from "../components/Modals/adminViewAccountInfo.jsx";
import AddPetAllergiesModal from "../components/Modals/addPetAllergiesModal.jsx";
import AddPetMedicationsModal from "../components/Modals/addPetMedicationsModal.jsx";
import AddPetDiseasesModal from "../components/Modals/addPetDiseasesModal.jsx";
import VerifyPhoneModal from "../components/Modals/verifyPhoneModal.jsx";
import AddAdminModal from "../views/Admin/ManageProfiles/components/AddAdminModal.jsx";

const ModalManager = () => {
    const {modalState, hideModal} = useModal();

    const renderModal = () => {
        switch(modalState.type) {
            /*
            |   AGENT
            */
            case 'AddAppointmentConfirmationModal1':
                return <AddAppointmentConfirmationModal1 {...modalState.props} onClose={hideModal}/>;

            case 'AppointmentRecordModal1':
                return <AppointmentRecordModal1 {...modalState.props} onClose={hideModal}/>;

            case 'AppointmentRecordModalAdmin1':
                return <AppointmentRecordModalAdmin1 {...modalState.props} onClose={hideModal}/>;

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

            case 'EditPetModal1':
                return <EditPetModal1 {...modalState.props} onClose={hideModal} />;

            case 'ConfirmActionModal1':
                return <ConfirmActionModal1 {...modalState.props} onClose={hideModal} />;

            case 'EditUserModal1':
                return <EditUserModal1 {...modalState.props} onClose={hideModal} />;

            case 'EditItemModal1':
                return <EditItemModal1 {...modalState.props} onClose={hideModal}/>;

            case 'EditItemConfirmationModal1':
                return <EditItemConfirmationModal1 {...modalState.props} onClose={hideModal}/>;

            case 'EditCategoryConfirmationModal1':
                return <EditCategoryConfirmationModal1 {...modalState.props} onClose={hideModal}/>;

            case 'FeedbackModal1':
                return <FeedbackModal1 {...modalState.props} onClose={hideModal}/>;
            
            case 'AddItemConfirmationModal1':
                return <AddItemConfirmationModal1 {...modalState.props} onClose={hideModal}/>;
            
            case 'AddCategoryConfirmationModal1':
                return <AddCategoryConfirmationModal1 {...modalState.props} onClose={hideModal}/>;
            
            case 'TransactionDetailsModal1':
                return <TransactionDetailsModal1 {...modalState.props} onClose={hideModal}/>;
                
            case 'AdminShowAppointment':
                return <AdminShowAppointment {...modalState.props} onClose={hideModal}/>;

            case 'AddInventoryItemsModal1':
                return <AddInventoryItemsModal1 {...modalState.props} onClose={hideModal}/>;





            /**
             * ADMIN MANAGE ACCOUNTS
             */
            case 'AddAdminModal':
                return <AddAdminModal {...modalState.props} onClose={hideModal}/>;





            /**
             * PET PROFILE
             */
            case 'AddPetAllergiesModal':
                return <AddPetAllergiesModal {...modalState.props} onClose={hideModal}/>;
            case 'AddPetMedicationsModal':
                return <AddPetMedicationsModal {...modalState.props} onClose={hideModal}/>;
            case 'AddPetDiseasesModal':
                return <AddPetDiseasesModal {...modalState.props} onClose={hideModal}/>;





            /**
             * Profile
             */
            case 'VerifyPhoneModal':
                return <VerifyPhoneModal {...modalState.props} onClose={hideModal}/>
            
            
            
            
            /**
             * Manage Accounts
             */
            case 'AdminViewAccountInfoModal1':
                return <AdminViewAccountInfo {...modalState.props} onClose={hideModal}/>;

            

            
            /**
             * General
             */
            case 'GeneralConfirmationModal':
                return <GeneralConfirmationModal {...modalState.props} onClose={hideModal}/>;

                    
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
