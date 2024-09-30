import { Link } from "react-router-dom";
import '../assets/css/inventory_box.css';

export default function InventoryBox({ link, itemName, itemImage, itemQuantity }) {
    return (
        <Link to={link} className="inventory-box">
            <img src={`/assets/media/items/${itemImage}`} alt={itemName} className="inventory-image" />
            <div className="item-details">
                <h4 className="item-name">{itemName}</h4>
                <p className="item-quantity">Quantity: {itemQuantity}</p>
            </div>
        </Link>
    );
}