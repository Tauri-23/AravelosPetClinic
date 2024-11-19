import { Link } from "react-router-dom";
import '../assets/css/inventory_box.css';

export default function InventoryBox({ handleInventoryBoxClick, itemName, itemImage, itemQuantity, itemDescription}) {
    return (
        <div onClick={() => handleInventoryBoxClick(itemName, itemImage, itemQuantity, itemDescription)} className="inventory-box">
            <div className="inventory-image">
                <img src={`/assets/media/items/${itemImage}`} alt={itemName} className="inventory-image" />
            </div>

            <div className="item-details">
                <div className="item-name">{itemName}</div>
                <p className="item-quantity">Quantity: {itemQuantity}</p>

            </div>
        </div>
    );
}
