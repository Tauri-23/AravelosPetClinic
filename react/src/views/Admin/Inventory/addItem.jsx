import React, { useEffect, useState } from 'react';
import "../../../assets/css/addItem.css";
import { fetchAllInventoryCategories } from '../../../services/InventoryServices.jsx';
import axiosClient from '../../../axios-client.js';
import { notify } from '../../../assets/js/utils.jsx';
import Dropdown2 from '../../../components/dropdowns2.jsx';
import { useNavigate } from 'react-router-dom';
import AddItemConfirmationModal1 from '../../../components/Modals/addItemConfirmationModal1';

export default function AddItem() {
    const navigate = useNavigate();

    const [categoryOptions, setCategoryOptions] = useState(null);
    const [categoryValue, setCategoryValues] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemStock, setItemStock] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDesc, setItemDesc] = useState('');
    const [itemImagePrev, setItemImagePrev] = useState(null);
    const [itemImage, setItemImage] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    
    // Measurement feature states
    const [measurementRequired, setMeasurementRequired] = useState(false);
    const [measurementValue, setMeasurementValue] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState("");
    


    /**
     * Fetch All Necessary Data
     */
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const data = await fetchAllInventoryCategories();
                setCategoryOptions(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllCategories();
    }, []);



    /**
     * Handlers
     */
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemImagePrev(URL.createObjectURL(file));
            setItemImage(file);
        }
    };

    const handleShowModal = () => {
        setShowConfirmationModal(true);
    };

    const handleConfirmAdd = () => {
        setShowConfirmationModal(false);

        const formData = new FormData();
        formData.append('category', categoryValue);
        formData.append('name', itemName);
        formData.append('price', itemPrice);
        formData.append('desc', itemDesc);
        formData.append('img', itemImage);

        // Add measurement data if required
        if (measurementRequired) {
            formData.append('measurementValue', measurementValue);
            formData.append('measurementUnit', measurementUnit);
        }

        axiosClient.post('/add-inventory', formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    notify('success', data.message, 'top-center', 3000);
                    navigate('/AdminIndex/InventoryTracking');
                } else {
                    notify('error', data.message, 'top-center', 3000);
                }
            }).catch(error => {
                console.error(error);
            });
    };

    const handleCancel = () => {
        setCategoryValues('');
        setItemName('');
        setItemPrice(0);
        setItemDesc('');
        setItemImage(null);
        setItemImagePrev(null);
        setMeasurementRequired(false);
        setMeasurementValue('');
        setMeasurementUnit('');

        navigate(-1);
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };


    
    /**
     * Render
     */
    return (
        <div className='page'>
            {categoryOptions
            ? (
                <>
                    <div className='inventory-tracking gen-margin'>
                        <h1 className='anybody'>Add Item</h1>

                        <div className="d-flex add small-form">
                            {/* Left Side - Image with Upload */}
                            <div className="image-upload">
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                                <div className="image-preview">
                                    {itemImagePrev ? (
                                        <img src={itemImagePrev} alt="Item Preview" />
                                    ) : (
                                        <div className="placeholder">Image Preview</div>
                                    )}
                                </div>
                            </div>

                            {/* Right Side - Dropdown and Text Fields */}
                            <div className="addItemDetails">
                                <label htmlFor="category">Category</label>
                                <Dropdown2
                                    options={categoryOptions}
                                    name="category"
                                    onChange={setCategoryValues}
                                    placeholder="Choose Category"
                                />

                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    name="itemName"
                                    placeholder="Item Name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />

                                {/* <label htmlFor="itemStock">Item Stock</label>
                                <input
                                    type="number"
                                    name="itemStock"
                                    placeholder="Item Stock"
                                    value={itemStock}
                                    onChange={(e) => setItemStock(e.target.value)}
                                    min={0}
                                /> */}

                                <label htmlFor="price">Item Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                />

                                <label htmlFor="itemDescription">Item Description</label>
                                <textarea
                                    style={{ resize: "none" }}
                                    name="itemDescription"
                                    placeholder="Item Description"
                                    value={itemDesc}
                                    onChange={(e) => setItemDesc(e.target.value)}
                                />

                                {/* Measurement Section */}
                                <div className="measurement-section">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={measurementRequired}
                                            onChange={() => setMeasurementRequired(!measurementRequired)}
                                        />
                                        Measurement:
                                    </label>
                                    {measurementRequired && (
                                        <div className="measurement-inputs">
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                value={measurementValue}
                                                onChange={(e) => setMeasurementValue(e.target.value)}
                                            />
                                            <select
                                                value={measurementUnit}
                                                onChange={(e) => setMeasurementUnit(e.target.value)}
                                            >
                                                <option value="">Unit</option>
                                                <option value="ml">ml</option>
                                                <option value="mg">mg</option>
                                                <option value="g">g</option>
                                                <option value="kg">kg</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            
                                {/* Button Group */}
                                <div className="button-group">
                                    <button type="button" onClick={handleShowModal} className="primary-btn-blue1">
                                        Submit
                                    </button>
                                    <button type="button" onClick={handleCancel} className="sub-button">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Confirmation Modal */}
                        {showConfirmationModal && (
                            <AddItemConfirmationModal1
                                onConfirm={handleConfirmAdd}
                                onCancel={handleCloseModal}
                            />
                        )}
                    </div>
                </>
            )
            : (<>Loading...</>)}
        </div>
    )
}
