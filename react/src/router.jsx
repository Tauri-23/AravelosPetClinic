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
import ClinicCalendar from "./views/Admin/Appointment/clinicCalendar";
import ApproveAppointment from "./views/Admin/Appointment/approveAppointment";
import BookAppointment from "./views/Client/appointment/bookappointment";
import MyAppointments from "./views/Client/appointment/myappointments";
import ManageProfiles from "./views/Admin/manageProfiles";
import AdminFeedback from "./views/Admin/adminFeedback";
import AdminFeedbackAnalysis from "./views/Admin/adminFeedbackAnalysis";
import AdminAppointmentDefault from "./views/Admin/Appointment/admin_appointment_default";
import AdminPendingAppointments from "./views/Admin/Appointment/admin_pending_appointments";
import AdminApprovedAppointments from "./views/Admin/Appointment/admin_approved_appointments";
import AdminCompletedAppointments from "./views/Admin/Appointment/admin_completed_appointments";
import AdminCancelledAppointments from "./views/Admin/Appointment/admin_cancelled_appointments";
import AdminViewInventory from "./views/Admin/Inventory/viewInventory";
import AdminTrainModel from "./views/Admin/TrainModel/admin_train_model";

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
            {
                index:true,
                element: <AdminIndex/>
            },
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

            /**
             * Appointments
             */
            {
                path: "ClinicCalendar",
                element: <ClinicCalendar />
            },
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
                path: 'ApproveAppointment/:appointmentId',
                element: <ApproveAppointment />
            },



            {
                path: 'ManageProfiles', // Remove leading `/`
                element: <ManageProfiles />
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
