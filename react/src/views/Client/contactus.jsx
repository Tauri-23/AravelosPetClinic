import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ClientContactUs() {
    const{user} = useStateContext();

    useEffect(() => {
        console.log(user);
    }, []);

    return(

        <div className = "page">
            <>
            Contact Us + Feedback</>
        </div>
    );
}
