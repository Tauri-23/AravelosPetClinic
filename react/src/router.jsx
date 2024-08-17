import {createBrowserRouter} from "react-router-dom";
import GuestDefault from "./views/Guest/default";
import ClientDefault from "./views/Client/default";
import GuestIndex from "./views/Guest";
import GuestPets from "./views/Guest/pets";

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
        path: '/Client',
        element: <ClientDefault/>
    }
]);

export default router;