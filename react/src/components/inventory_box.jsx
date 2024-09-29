import { Link } from "react-router-dom";

export default function InventoryBox({link}) {
    return(
        <Link to={link} className="inventory-box">
         Medicine1
         <img src="" alt="" />
        </Link>
    );
}