import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { fetchAllInventoryCategories, fetchAllInventoryItems } from '../../../services/InventoryServices.jsx';
import axiosClient from '../../../axios-client.js';
import { notify } from '../../../assets/js/utils.jsx';
import '../../../assets/css/InventoryTracking.css';
import InventoryBox from '../../../components/inventory_box.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';

export default function AdminInventoryIndex() {
  const {showModal} = useModal();
  const [categories, setCategories] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryItems, setInventoryItems] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
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
    const getAllInventoryItems = async() => {
      try {
        const data = await fetchAllInventoryItems();
        setInventoryItems(data);
      } catch (error) {
        console.error(error);
      }
    }

    const getAll = async() => {
      getAllCategories();
      getAllInventoryItems();
    }

    getAll();
  }, []);

  // SetActive Category
  useEffect(() => {
    if(categories?.length > 0 && inventoryItems?.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [categories])


  /*
  | Debugging
  */
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems])

  const handleAddCategoryPost = (newCategory) => {
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
  }

  const handleAddCategory = () => {
    showModal('AddCategoryModal1', {handleAddCategoryPost})
  };


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInventoryBoxClick=(itemName, itemImage, itemQuantity, itemDescription) => {
    showModal('InventoryBoxModal1', {itemName, itemImage, itemQuantity, itemDescription})
  }

  const handleEditCategoryPost = (updatedCategoryId, updatedCategoryName) => {
    const formData = new FormData();
    formData.append('id', updatedCategoryId);
    formData.append('name', updatedCategoryName);

    axiosClient.post('/edit-inventory-categories', formData)
      .then(({ data }) => {
        if (data.status === 200) {
          setCategories((prev) =>
            prev.map((category) =>
              category.id === updatedCategoryId
                ? { ...category, name: updatedCategoryName }
                : category
            )
          );
          notify('success', data.message, 'top-center', 3000);
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleEditCategoryClick = () => {
    showModal('EditCategoryModal1', {categories, handleEditCategoryPost, handleDeleteCategoryClick})
  }
  
  const handleDeleteCategoryClick = (categoryId) => {
    axiosClient.delete(`/delete-inventory-categories/${categoryId}`)
      .then(({ data }) => {
        if (data.status === 200) {
          // Update the state to remove the deleted category
          setCategories(prevCategories => 
            prevCategories.filter(category => category.id !== categoryId)
          );
          // Notify the user of successful deletion
          notify('success', data.message, 'top-center', 3000);
        } else {
          // Notify the user of an unsuccessful attempt
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch((error) => {
        // Log the error to the console for debugging
        console.error("Error deleting category:", error);
        // Notify the user of the error
        notify('error', 'Failed to delete category. Please try again.', 'top-center', 3000);
      });
  };
  
  return (
    <div className="page">
      <div className="inventory-tracking  gen-margin">
        <h1 className='anybody' >Inventory Tracking</h1>

        <div className="d-flex inv small-form">

          {/* Sidebar with Categories */}
          <div className="sidebar">
            {/* Header with icons */}
            <div className="category-header anybody">
              <h3>Categories</h3>
            </div>
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
                  onClick={() => handleEditCategoryClick()} // Add any functionality if needed for editing categories
                />
              </div>

            <div className='category-nav-links'>
              {categories?.length > 0 && categories.map((category) => (
                <Link
                className={`category-nav-link ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                key={category.id}
                >
                  {category.name}
                </Link>
              ))}

              {categories?.length < 1 && <>No Categories</>}
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
                <button className="primary-btn-blue1 action-button">Add Item</button>
              </Link>
            </div>

            <div className="bottom-content">
              {/* Route for Inventory Display */}
              <div className="admin-inventory-contents left-margin">
                {inventoryItems?.length > 0 && inventoryItems.map(item =>
                  item.category == activeCategory &&
                  (<InventoryBox key={item.id} handleInventoryBoxClick={handleInventoryBoxClick} itemName={item.name} itemImage={item.picture} itemQuantity={item.qty} itemDescription={item.desc}/>)
                )}


                {/* Inventory items would be displayed here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
