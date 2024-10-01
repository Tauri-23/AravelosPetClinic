import { Link } from "react-router-dom";
import '../assets/css/inventory_box.css';

export default function InventoryBox({ handleInventoryBoxClick, itemName, itemImage, itemQuantity }) {
    return (
        <div onClick={() => handleInventoryBoxClick(itemName, itemImage, itemQuantity)} className="inventory-box">
            <div className="inventory-image">
                <img src={`/assets/media/items/${itemImage}`} alt={itemName} className="inventory-image" />
            </div>
            
            <div className="item-details">
                <h4 className="item-name">{itemName}</h4>
                <p className="item-quantity">Quantity: {itemQuantity}</p>
            </div>
        </div>
    );
}