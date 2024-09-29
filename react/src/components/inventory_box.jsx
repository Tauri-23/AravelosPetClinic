import { Link } from "react-router-dom";

export default function InventoryBox({med, link}) {
    return(
        <Link to={link} className="inventory-box">
          {med.name}
        </Link>
    );
}