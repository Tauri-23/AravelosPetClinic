import {createBrowserRouter} from "react-router-dom"
import GuestDefault from "./views/Guest/default";
import GuestIndex from "./views/Guest";
import GuestContactUs from "./views/Guest/contactus";
import ClientDefault from "./views/Client/default";
import ClientIndex from "./views/Client";
import ClientContactUs from "./views/Client/contactus";
import AdminDefault from "./views/Admin/default";
import AdminIndex from "./views/Admin";
import Sign from "./views/Sign/sign";
import ForgotPassword from "./views/Sign/forgot_password";
import ClientuserProfile from "./views/Client/userprofiles";
import AdminInventoryDefault from "./views/Admin/Inventory/inventory_default";
import AdminInventoryIndex from "./views/Admin/Inventory/inventory_index";
import AddItem from "./views/Admin/Inventory/addItem";
import ClinicCalendar from "./views/Admin/Appointments/clinicCalendar";
import BookAppointment from "./views/Client/appointment/bookappointment";
import MyAppointments from "./views/Client/appointment/myappointments";
import AdminFeedback from "./views/Admin/adminFeedback";
import AdminFeedbackAnalysis from "./views/Admin/adminFeedbackAnalysis";
import AdminAppointmentDefault from "./views/Admin/Appointments/admin_appointment_default";
import AdminPendingAppointments from "./views/Admin/Appointments/admin_pending_appointments";
import AdminApprovedAppointments from "./views/Admin/Appointments/admin_approved_appointments";
import AdminCompletedAppointments from "./views/Admin/Appointments/admin_completed_appointments";
import AdminCancelledAppointments from "./views/Admin/Appointments/admin_cancelled_appointments";
import AdminViewInventory from "./views/Admin/Inventory/viewInventory";
import AdminTrainModel from "./views/Admin/TrainModel/admin_train_model";
import AdminViewAppointment from "./views/Admin/Appointments/admin_view_appointment";
import AdminManageProfilesDefault from "./views/Admin/ManageProfiles/admin_manage_profiles_default";
import AdminManageProfilesClients from "./views/Admin/ManageProfiles/admin_manage_profiles_clients";
import AdminManageProfilesAdmins from "./views/Admin/ManageProfiles/admin_manage_profiles_admins";
import AdminManageProfileViewClientProfile from "./views/Admin/ManageProfiles/admin_manage_profile_view_client_profile";
import AdminManageProfileViewPetProfile from "./views/Admin/ManageProfiles/admin_manage_profile_view_pet_profile";

const router = createBrowserRouter([
    /*
    |----------
    | GUEST
    |----------
    */
    {
        path: '/',
        element: <GuestDefault/>,
        children: [
            {
                index: true,
                element: <GuestIndex/>
            },
            {
                path:'GuestContactUs',
                element: <GuestContactUs/>
            },
            {
                path:'Sign',
                element: <Sign/>
            },
            {
                path:'ForgotPassword',
                element: <ForgotPassword/>
            }
        ]
    },





    /*
    |----------
    | Client
    |----------
    */
    {
        path: '/ClientIndex',
        element: <ClientDefault />,
        children: [
            {
                index: true,
                element: <ClientIndex />
            },
            {
                path: 'BookAppointment', // Remove leading `/`
                element: <BookAppointment />
            },
            {
                path: 'BookAppointment/MyAppointments', // Remove leading `/`
                element: <MyAppointments />
            },

            {
                path: 'ClientContactUs', // Remove leading `/`
                element: <ClientContactUs />
            },
            {
                path: 'ClientUserProfile', // Remove leading `/`
                element: <ClientuserProfile />
            }
        ]
    },





    /*
    |----------
    | Admin
    |----------
    */
    {
        path: '/AdminIndex',
        element: <AdminDefault/>,
        children: [
            /**
             * Dashboard
             */
            {
                index:true,
                element: <AdminIndex/>
            },


            /**
             * Appointments
             */            
            {
                path: "Appointments",
                element: <AdminAppointmentDefault/>,
                children: [
                    {
                        index: true,
                        element: <AdminPendingAppointments/>
                    },
                    {
                        path: 'Approved',
                        element: <AdminApprovedAppointments/>
                    },
                    {
                        path: 'Completed',
                        element: <AdminCompletedAppointments/>
                    },
                    {
                        path: 'Cancelled',
                        element: <AdminCancelledAppointments/>
                    },               
                ]
            },
            {
                path: "ViewAppointment/:appointmentId",
                element: <AdminViewAppointment/>
            },


            /**
             * Calendar
             */
            {
                path: "ClinicCalendar",
                element: <ClinicCalendar />
            },


            /**
             * Manage Profiles
             */
            {
                path: 'ManageProfiles',
                element: <AdminManageProfilesDefault />,
                children: [
                    {
                        index: true,
                        element: <AdminManageProfilesClients/>
                    },
                    {
                        path: "Admins",
                        element: <AdminManageProfilesAdmins/>
                    }
                ]
            },
            {
                path: "ViewClientProfile/:clientId",
                element: <AdminManageProfileViewClientProfile/>
            },
            {
                path: "ViewPetProfile/:petId",
                element: <AdminManageProfileViewPetProfile/>
            },


            /**
             * Inventory
             */
            {
                path: 'InventoryTracking',
                element: <AdminInventoryDefault />,
                children: [
                    {
                        index: true,
                        element: <AdminInventoryIndex/>
                    },
                    {
                        path: 'AddItem',
                        element: <AddItem/>
                    },
                    {
                        path: 'ViewInventory/:inventoryId',
                        element: <AdminViewInventory/>
                    }
                ]
            },

            



            
            {
                path: 'AdminFeedback', // Remove leading `/`
                element: <AdminFeedback />
            },
            {
                path: 'AdminFeedbackAnalysis', // Remove leading `/`
                element: <AdminFeedbackAnalysis />
            },



            /**
             * Train Model
             */
            {
                path: 'TrainModel',
                element: <AdminTrainModel/>
            }
        ]
    }
]);

export default router;
