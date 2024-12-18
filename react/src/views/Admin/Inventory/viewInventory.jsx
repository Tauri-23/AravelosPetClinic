import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFullInventoryItemsWhereId } from "../../../services/InventoryServices";
import '../../../assets/css/viewInventory.css';

export default function AdminViewInventory() {
    const {inventoryId} = useParams();
    const [inventory, setInventory] = useState(null);



    /**
     * Fetch all necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            try {
                const data = await fetchFullInventoryItemsWhereId(inventoryId);
                console.log(data);
                setInventory(data);
            } catch (error) {
                console.log(error);
            }
        }

        getAll();
    }, []);



    /**
     * Render
     */
    return(
        <section className="view-inventory-content1">
            {inventory
            ? (
                <>
                    <h1 className="anybody" style={{marginBottom: "30px"}}>View Inventory</h1>

                    <div className="view-inventory-cont1">
                        <div className="view-inventory-cont1-pic">
                            <img src={`/assets/media/items/${inventory.picture}`} alt="inventory Pic"/>
                        </div>
                        <div className="view-inventory-cont1-info anyone">
                            <h2>{inventory.name} {inventory.measurement_value}{inventory.measurement_unit}</h2>
                            <h4>Instock: {inventory.qty}</h4>
                            <p>{inventory.desc}</p>
                        </div>
                        <div className="view-inventory-btns">
                            <div className="primary-btn-blue1">Edit</div>
                            <div className="primary-btn-red1 disabled">Delete</div>
                        </div>
                    </div>
                </>
            )
            : (<>Loading...</>)}
        </section>
    );
}