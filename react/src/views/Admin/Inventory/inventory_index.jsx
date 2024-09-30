import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { fetchAllInventoryCategories } from '../../../services/InventoryServices.jsx';
import axiosClient from '../../../axios-client.js';
import { notify } from '../../../assets/js/utils.jsx';
import '../../../assets/css/InventoryTracking.css'


export default function AdminInventoryIndex() {
  const [categories, setCategories] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();



  // Get All Items From DB
  useEffect(() => {
    const getAllCategories = async() => {
      try {
        const data = await fetchAllInventoryCategories();
        setCategories(data)
      } catch(error) { console.error(error);}
    }

    getAllCategories();
  }, []);

  const handleAddCategory = () => {
    // if (newCategory.trim()) {
    //   const newCategoryObj = { name: newCategory, path: newCategory.toLowerCase() };
    //   setCategories([...categories, newCategoryObj]);
    //   setNewCategory('');
    //   // navigate(`/inventory/${newCategoryObj.path}`);
    // }

    
    const formData = new FormData();
    formData.append('name', newCategory);
    axiosClient.post('/add-inventory-categories', formData)
    .then(({data}) => {
      if(data.status === 200) {
        setCategories(prev => 
          [...prev, data.category]
        );
        notify('success', data.message, 'top-center', 3000);
      }
      else {
        notify('error', data.message, 'top-center', 3000);
      }
    }).catch(error => {console.error(error)})
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
              {categories?.length > 0 && categories.map((category) => (
                <li key={category.id}>
                  <NavLink 
                    to={`${category.path}`} 
                    className={({ isActive }) => (isActive ? "active" : "")} // Dynamic class assignment
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}

              {categories?.length < 1 && (
                <>No Categories</>
              )}
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
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
