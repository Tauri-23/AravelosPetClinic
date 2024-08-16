import {createBrowserRouter} from "react-router-dom";
import GuestDefault from "./views/Guest/default";

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
                
            }
        ]
    }
]);

export default router;