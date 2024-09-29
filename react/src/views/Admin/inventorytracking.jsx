import React, { useState } from 'react';
import "../../assets/css/app.css";
import "../../assets/css/inventorytracking.css";
import { NavLink, Link, Routes, Route, useNavigate } from 'react-router-dom';
import InventoryDisplay from "../../components/inventorydisplay.jsx";


export default function AdminInventoryTracking() {
  const [categories, setCategories] = useState([
    { name: 'Medicine', path: 'medicine' },
    { name: 'Supplies', path: 'supplies' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = { name: newCategory, path: newCategory.toLowerCase() };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
      navigate(`/inventory/${newCategoryObj.path}`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement filtering functionality if needed
  };

  return (
    <div className='page'>
      <div className='inventory-tracking gen-margin'>
        <h1>Inventory Tracking</h1>

        <div className="d-flex inv small-form">
          {/* Sidebar with Categories */}
          <div className="sidebar">
            <h3>Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category.path}>
                  <NavLink 
                    to={`${category.path}`} 
                    className={({ isActive }) => (isActive ? "active" : "")} // Dynamic class assignment
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 20 }}>
              <h4>Add Category</h4>
              <input className="categoryInput"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"

              />
              <button onClick={handleAddCategory}>Add</button>
            </div>
          </div>

          {/* Right Side with Search and Inventory Display */}
          <div className='right-side'>
            {/* Navbar with Search and Action Buttons */}
            <div className="top-nav">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
              />
              <button className="action-button">Add Stock</button>
             <Link to ="addItem"> <button className="action-button">Add Item</button> </Link>
            </div>

            <div className='bottom-content'>
              {/* Route for Inventory Display */}
              <div className='admin-inventory-contents left-margin'>
                <Routes>
                  {/* Define the route pattern for dynamic category matching */}
                  <Route
                    path="inventory/:category"
                    element={<InventoryDisplay />}
                  />

                  {/* Optional: Catch-all route for invalid paths */}
                  <Route
                    path="*"
                    element={<h2>404 Not Found</h2>}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
