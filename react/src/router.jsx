import {createBrowserRouter} from "react-router-dom"
import GuestDefault from "./views/Guest/default";
import GuestIndex from "./views/Guest";
import GuestContactUs from "./views/Guest/contactus";
import ClientDefault from "./views/Client/default";
import ClientIndex from "./views/Client";
import BookAppointment from "./views/Client/bookappointment";
import ClientContactUs from "./views/Client/contactus";
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
                path:'GuestContactUs',
                element: <GuestContactUs/>
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
                path:'/ClientIndex/BookAppointment',
                element: <BookAppointment/>
            },
            {
                path:'/ClientIndex/ClientContactUs',
                element: <ClientContactUs/>
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
