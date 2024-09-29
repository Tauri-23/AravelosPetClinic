import { Link } from "react-router-dom";

export default function InventoryBox({link}) {
    return(
        <Link to={link} className="inventory-box">
         medicine1
         <img src="" alt="" />
        </Link>
    );
}