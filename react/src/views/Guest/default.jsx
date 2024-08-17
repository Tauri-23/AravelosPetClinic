import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function GuestDefault() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        alert('effect');
    }, [count]);

    return(
        <>
            <h1>NAVBAR GUSET</h1>
            
            <Link to={'/Pets'}>Pets</Link> <br/>

            Count: {count}
            <button onClick={() => setCount(count+1)}>add</button>

            <Outlet/>
        </>
    );
}