import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { fetchAllInventoryCategories } from '../../../services/InventoryServices.jsx';
import axiosClient from '../../../axios-client.js';
import { notify } from '../../../assets/js/utils.jsx';
import '../../../assets/css/InventoryTracking.css';
import InventoryBox from '../../../components/inventory_box.jsx';

export default function AdminInventoryIndex() {
  const [categories, setCategories] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  // Get All Items From DB
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const data = await fetchAllInventoryCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllCategories();
  }, []);

  const handleAddCategory = () => {
    const formData = new FormData();
    formData.append('name', newCategory);
    axiosClient.post('/add-inventory-categories', formData)
      .then(({ data }) => {
        if (data.status === 200) {
          setCategories((prev) => [...prev, data.category]);
          notify('success', data.message, 'top-center', 3000);
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="page">
      <div className="inventory-tracking gen-margin">
        <h1>Inventory Tracking</h1>

        <div className="d-flex inv small-form">

          {/* Sidebar with Categories */}
          <div className="sidebar">
            {/* Header with icons */}
            <div className="category-header">
              <h3>Categories</h3>

              
            </div>
            <hr />
            <div className="icons">
                <img
                  src="/assets/media/icons/add_btn.svg" // Add your add icon path here
                  alt="Add"
                  title="Add Category"
                  onClick={handleAddCategory} // You can link the add functionality here
                />
                <img
                  src="/assets/media/icons/edit_btn.svg" // Add your edit icon path here
                  alt="Edit"
                  title="Edit Categories"
                  // Add any functionality if needed for editing categories
                />
              </div>

            <ul>
              {categories?.length > 0 && categories.map((category) => (
                <li key={category.id}>
                  <NavLink
                    to={`${category.path}`}
                    className={({ isActive }) => (isActive ? 'active' : '')} // Dynamic class assignment
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}

              {categories?.length < 1 && <>No Categories</>}
            </ul>

            <div style={{ marginTop: 20 }}>
              <h4>Add Category</h4>
              <input
                className="categoryInput"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
              />
              <button onClick={handleAddCategory}>Add</button>
            </div>
          </div>

          {/* Right Side with Search and Inventory Display */}
          <div className="right-side">
            {/* Navbar with Search and Action Buttons */}
            <div className="top-nav">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
              />
              
              <Link to="AddItem">
                <button className="action-button">Add Item</button>
              </Link>
            </div>

            <div className="bottom-content">
              {/* Route for Inventory Display */}
              <div className="admin-inventory-contents left-margin">
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                <InventoryBox itemName={"Med1"} itemImage={"sd2m2nvHCWUHr1FYowRKXjKv.webp"} itemQuantity={3} />
                <InventoryBox itemName={"Med2"} itemImage={"med_placeholder.jpg"} itemQuantity={3} />
                
                {/* Inventory items would be displayed here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
