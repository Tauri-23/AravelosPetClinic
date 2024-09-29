import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ClientContactUs() {
    const{user} = useStateContext();

    useEffect(() => {
        console.log(user);
    }, []);

    return(
        <body>
            <>
            Contact Us + Feedback</>
        </body>
    );
}
