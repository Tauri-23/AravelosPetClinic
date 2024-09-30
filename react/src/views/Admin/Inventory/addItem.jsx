import React, { useEffect, useState } from 'react';
import "../../../assets/css/addItem.css";
import { fetchAllInventoryCategories } from '../../../services/InventoryServices.jsx';
import axiosClient from '../../../axios-client.js';
import { isEmptyOrSpaces, notify } from '../../../assets/js/utils.jsx';
import Dropdown2 from '../../../components/dropdowns2.jsx';

export default function AddItem() {
    const [categoryOptions, setCategoryOptions] = useState(null);
    const [categoryValue, setCategoryValues] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemStock, setItemStock] = useState(0);
    const [itemDesc, setItemDesc] = useState('');
    const [itemImagePrev, setItemImagePrev] = useState(null);
    const [itemImage, setItemImage] = useState(null);


    useEffect(() => {
        const getAllCategories = async() => {
            try {
                const data = await fetchAllInventoryCategories();
                setCategoryOptions(data);
            } catch(error) { console.error(error)}
        }

        getAllCategories();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemImagePrev(URL.createObjectURL(file));
            setItemImage(file)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', categoryValue);
        formData.append('name', itemName);
        formData.append('stock', itemStock);
        formData.append('desc', itemDesc);
        formData.append('img', itemImage);

        axiosClient.post('/add-inventory-item', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify('success', data.message, 'top-center', 3000);
            } else {
                notify('error', data.message, 'top-center', 3000);
            }
        }).catch(error => {console.error(error)})
    };

    if(categoryOptions) {
        return (
            <div className='page'>
                <div className='inventory-tracking gen-margin'>
                    <h1>Add Item</h1>

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

                            <label htmlFor="itemStock">Item Stock</label>
                            <input
                                type="number"
                                name="itemStock"
                                placeholder="Item Stock"
                                value={itemStock}
                                onChange={(e) => setItemStock(e.target.value)}
                                min={0}
                            />

                            <label htmlFor="itemDescription">Item Description</label>
                            <textarea style={{resize: "none"}}
                                name="itemDescription"
                                placeholder="Item Description"
                                value={itemDesc}
                                onChange={(e) => setItemDesc(e.target.value)}
                            />

                            {/* Submit Button */}
                            <button type="submit" onClick={handleSubmit} className="primary-btn-blue1">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        <>Loading</>
    }
}
