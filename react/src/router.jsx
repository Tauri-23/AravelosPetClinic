import {createBrowserRouter} from "react-router-dom"
import GuestDefault from "./views/Guest/default";
import GuestIndex from "./views/Guest";
import GuestPets from "./views/Guest/pets";
import ClientDefault from "./views/Client/default";
import ClientIndex from "./views/Client";
import BookAppointment from "./views/Client/bookappointment";
import ContactUs from "./views/Client/contactus";
import AdminDefault from "./views/Admin/default";
import AdminIndex from "./views/Admin";

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
                path: 'Pets',
                element: <GuestPets/>
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
        element: <ClientDefault/>,
        children: [
            {
                index:true,
                element: <ClientIndex/>
            },
            {
                path:'BookAppointment',
                element: <BookAppointment/>
            },
            {
                path:'ContactUs',
                element: <ContactUs/>
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
            }
        ]
    }
]);

export default router;
