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
import Appointments from "./views/Admin/Appointment/appointments";
import ApproveAppointment from "./views/Admin/Appointment/approveAppointment";
import BookAppointment from "./views/Client/appointment/bookappointment";
import MyAppointments from "./views/Client/appointment/myappointments";
import ManageProfiles from "./views/Admin/manageProfiles";
import AdminFeedback from "./views/Admin/adminFeedback";
import AdminFeedbackAnalysis from "./views/Admin/adminFeedbackAnalysis";

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
                    }
                ]
            },
            {
                path: 'ClinicCalendar', // Remove leading `/`
                element: <ClinicCalendar />
            },
            {
                path: 'ClinicCalendar/Appointments', // Remove leading `/`
                element: <Appointments />
            },
            {
                path: 'ClinicCalendar/Appointments/ApproveAppointment', // Remove leading `/`
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
            }

        ]
    }
]);

export default router;
