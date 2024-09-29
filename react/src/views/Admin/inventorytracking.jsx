import React, { useState } from 'react';
import "../../assets/css/inventorytracking.css";
import "../../assets/css/app.css";
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import InventoryDisplay from "../../components/inventorydisplay.jsx"; // Corrected import

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

        <div className="d-flex small-form" style={{ gap: 80 }}>
          {/* Navbar with Search and Action Buttons */}
          <div className="navbar" style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <input 
              type="text" 
              placeholder="Search inventory..." 
              value={searchQuery} 
              onChange={handleSearch} 
              className="search-bar"
              style={{ width: '300px', padding: '8px', marginRight: '10px' }} 
            />
            <button className="action-button">Add Stock</button>
            <button className="action-button">Add Product</button>
          </div>

          <div style={{ width: "300px", height: "100vh", background: "aliceblue", padding: 20, position: "fixed" }}>
            <h3>Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category.path}>
                  <NavLink to={`/inventory/${category.path}`} activeClassName="active">
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 20 }}>
              <h4>Add Category</h4>
              <input 
                type="text" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)} 
                placeholder="New category" 
              />
              <button onClick={handleAddCategory}>Add</button>
            </div>
          </div>

          <div className='admin-inventory-contents' style={{ marginLeft: "320px" }}>
            <Routes>
              {categories.map((category) => (
                <Route 
                  key={category.path} 
                  path={`/inventory/:category`} 
                  element={<InventoryDisplay category={category.name} />} 
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
