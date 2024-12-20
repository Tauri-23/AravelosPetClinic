import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFullInventoryItemsWhereId } from "../../../services/InventoryServices";
import '../../../assets/css/viewInventory.css';
import { useModal } from "../../../contexts/ModalContext";
import axiosClient from "../../../axios-client";
import { formatDate, notify } from "../../../assets/js/utils";

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
                setInventory(data);
            } catch (error) {
                console.error(error);
            }
        }

        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleAddInventoryItemsClick = () => {
        showModal("AddInventoryItemsModal1", {handleAdd: (expiration) => {
            const formData = new FormData();
            formData.append('inventoryId', inventory.id);
            formData.append("expirationDate", expiration);

            axiosClient.post("/add-inventory-item", formData)
            .then(({data}) => {
                if(data.status === 200) {
                    setInventory(data.inventory);
                }                
                notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
            }).catch(error => console.error(error));
        }});
    }

    const handleDeleteInventoryItemsClick = (inventoryItemId) => {
        showModal("GeneralConfirmationModal", {
            title: "Delete Item", 
            text: "Item will be permanently deleted.",
            positiveBtnText: "Delete",
            handlePositiveBtnClick: () => {
                const formData = new FormData();
                formData.append('itemId', inventoryItemId);
                formData.append('inventoryId', inventory.id);

                axiosClient.post("/del-inventory-item", formData)
                .then(({data}) => {
                    if(data.status === 200) {
                        setInventory(data.inventory);
                        // setInventory((prev) => ({
                        //     ...prev,
                        //     inventory_items: prev.inventory_items.filter((item) => item.id !== inventoryItemId),
                        // }));
                    }                
                    notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
                }).catch(error => console.error(error));
            },
        });
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
                        <button className="primary-btn-blue1" onClick={handleAddInventoryItemsClick}>Add Item</button>
                    </div>

                    <table className="view-inventory-cont2">
                        <thead className="view-inventory-cont2-thead">
                            <tr>
                                <th>Item ID</th>
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
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{formatDate(item.expiration_date)}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td className="d-flex">
                                        <button className="primary-btn-blue1">Edit</button>
                                        <button className="primary-btn-red1" onClick={() => handleDeleteInventoryItemsClick(item.id)}>Delete</button>
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