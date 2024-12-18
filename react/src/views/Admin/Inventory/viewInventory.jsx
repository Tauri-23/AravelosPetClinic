import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFullInventoryItemsWhereId } from "../../../services/InventoryServices";
import '../../../assets/css/viewInventory.css';
import { useModal } from "../../../contexts/ModalContext";

export default function AdminViewInventory() {
    const {inventoryId} = useParams();
    const {showModal} = useModal();
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
     * Handlers
     */
    const handleAddMedicineItemsClick = () => {

    }



    /**
     * Render
     */
    return(
        <section className="view-inventory-content1 page anyone">
            {inventory
            ? (
                <>
                    <h1 className="anybody" style={{marginBottom: "30px"}}>View Inventory</h1>

                    <div className="view-inventory-cont1" style={{marginBottom: "50px"}}>
                        <div className="view-inventory-cont1-pic">
                            <img src={`/assets/media/items/${inventory.picture}`} alt="inventory Pic"/>
                        </div>
                        <div className="view-inventory-cont1-info">
                            <h2>{inventory.name} {inventory.measurement_value}{inventory.measurement_unit}</h2>
                            <h4>Instock: {inventory.qty}</h4>
                            <p>{inventory.desc}</p>
                        </div>
                        <div className="view-inventory-btns">
                            <div className="primary-btn-blue1">Edit</div>
                            <div className="primary-btn-red1 disabled">Delete</div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between" style={{marginBottom: "30px"}}>
                        <h3>Inventory Items</h3>
                        <div className="primary-btn-blue1">Add Item</div>
                    </div>

                    <table className="view-inventory-cont2">
                        <thead className="view-inventory-cont2-thead">
                            <tr>
                                <th>Medicine ID</th>
                                <th>Expiration Date</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="view-inventory-cont2-tbody">
                            {inventory.inventory_items.length < 1 && (
                                <tr>
                                    <td>No Items</td>
                                </tr>
                            )}

                            {inventory.inventory_items.length > 0 && inventory.inventory_items.map(item => (
                                <tr>
                                    <td>1</td>
                                    <td>MM dd, YYYY</td>
                                    <td>MM dd, YYYY</td>
                                    <td className="d-flex">
                                        <div className="primary-btn-blue1">Edit</div>
                                        <div className="primary-btn-red1">Delete</div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </>
            )
            : (<>Loading...</>)}
        </section>
    );
}