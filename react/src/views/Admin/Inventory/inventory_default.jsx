import { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function AdminInventoryDefault() {
    const {setActiveNavLink} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Inventory Tracking");
    }, []);



    /**
     * Render
     */
    return(
        <Outlet/>
    );
}