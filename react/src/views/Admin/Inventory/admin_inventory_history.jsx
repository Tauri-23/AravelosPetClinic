import { useEffect } from "react"
import { useOutletContext } from "react-router-dom";

export default function AdminInventoryHistory() {
    const {setActivePage} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActivePage("History");
    }, []);



    /**
     * Render
     */
    return(
        <>
            
        </>
    )
}