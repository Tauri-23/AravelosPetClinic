import React, { useState } from 'react';
import "../../assets/css/addItem.css";
import Dropdown from "../../components/dropdowns.jsx";

export default function AddItem() {
    const categoryOptions = [
        { id: "med", label: "Medicine" },
        { id: "supplies", label: "Supplies" },
    ];

    const [formData, setFormData] = useState({
        category: '',
        itemName: '',
        itemStock: '',
        itemDescription: '',
        itemImage: null,
    });

    const handleDropdownChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                itemImage: URL.createObjectURL(file), // Preview image
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className='page'>
            <div className='inventory-tracking gen-margin'>
                <h1>Add Item</h1>

                <div className="d-flex add small-form">
                    {/* Left Side - Image with Upload */}
                    <div className="image-upload">
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        <div className="image-preview">
                            {formData.itemImage ? (
                                <img src={formData.itemImage} alt="Item Preview" />
                            ) : (
                                <div className="placeholder">Image Preview</div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Dropdown and Text Fields */}
                    <div className="addItemDetails">
                        <label htmlFor="category">Category</label>
                        <Dropdown
                            options={categoryOptions}
                            name="category"
                            onChange={handleDropdownChange}
                            placeholder="Choose Category"
                        />

                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            placeholder="Item Name"
                            value={formData.itemName}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="itemStock">Item Stock</label>
                        <input
                            type="number"
                            name="itemStock"
                            placeholder="Item Stock"
                            value={formData.itemStock}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="itemDescription">Item Description</label>
                        <textarea
                            name="itemDescription"
                            placeholder="Item Description"
                            value={formData.itemDescription}
                            onChange={handleInputChange}
                        />

                        {/* Submit Button */}
                        <button type="submit" onClick={handleSubmit} className="submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
