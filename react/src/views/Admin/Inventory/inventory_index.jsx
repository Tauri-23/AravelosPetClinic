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
  }, [categories]);

 /*
  | Debugging
  */
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems])

  /**
   * Search Handlers
   */
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Inventory Handlers
   */
  const handleInventoryBoxClick = (itemId, itemName, itemImage, itemQuantity, itemDescription) => {
    showModal('InventoryBoxModal1', {
      itemId,
      itemName,
      itemImage,
      itemQuantity,
      itemDescription,
      handleEditItemPost,
    });
  };

  const handleEditItemPost = (itemId, itemName, itemQty, itemDesc) => {
    console.log(`Editing item: ${itemId}, name: ${itemName}, qty: ${itemQty}, desc: ${itemDesc}`);
    const formData = new FormData();
    formData.append('id', itemId);
    formData.append('name', itemName);
    formData.append('qty', itemQty);
    formData.append('desc', itemDesc);

    axiosClient.post('/edit-inventory', formData)
    .then(({data}) => {
      if(data.status === 200) {
        setInventoryItems(data.inventoryItems);
      }
      notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
    }).catch(error => console.error(error));
  };

   /**
   * Category Handlers
   */
   const handleAddCategory = () => {
    showModal('AddCategoryModal1', {handleAddCategoryPost})
  };

  const handleEditCategoryClick = () => {
    showModal('EditCategoryModal1', {categories, handleEditCategoryClick: handleEditCategoryPost, handleDeleteCategoryClick: handleDeleteCategoryPost})
  }

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

  const handleEditCategoryPost = async (updatedCategoryId, updatedCategoryName) => {
    const formData = new FormData();
    formData.append('id', updatedCategoryId);
    formData.append('name', updatedCategoryName);

    try {
        const { data } = await axiosClient.post('/edit-inventory-categories', formData);

        if (data.status === 200) {
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === updatedCategoryId
                        ? { ...category, name: updatedCategoryName }
                        : category
                )
            );
            notify('success', data.message, 'top-center', 3000);
            return true;}
        else {
            notify('error', data.message, 'top-center', 3000);
            return false;}
    } 
    catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDeleteCategoryPost = async(categoryId) => {
    const formData = new FormData();
    formData.append('id', categoryId);

    return axiosClient.post('/delete-inventory-categories', formData)
      .then(({ data }) => {
        if (data.status === 200) {
          setCategories(prevCategories =>
            prevCategories.filter(category => category.id !== categoryId)
          );
          notify('success', data.message, 'top-center', 3000);
          return true;
        } else {
          notify('error', data.message, 'top-center', 3000);
          return false;
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        notify('error', 'Failed to delete category. Please try again.', 'top-center', 3000);
        return false;
      });
  };

  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, itemName: 'NexGard', qtyUsed: 5, qtyAdded: 10, date: new Date() },
    // Add more transactions here
  ]);

const sortedTransactions = [...transactionHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

const handleTransactionHistory = () => {
  // Show the Transaction Details Modal with transaction data
  showModal('TransactionDetailsModal1', { transactions: sortedTransactions });
};

  /**
   * Render
   */
  return (
    <div className="page">
      <div className="inventory-tracking gen-margin">
        <h1 className='anybody'>Inventory Tracking</h1>

        <div className="d-flex-inventory">
          
          <div className="d-flex inv small-form">

            {/* Sidebar with Categories */}
            <div className="sidebar">
              {/* Header with icons */}
              <div className="category-header anybody">
                <h3>Categories</h3>
              </div>
              <div className="icons">
                  <img
                    src="/assets/media/icons/add_btn.svg"
                    alt="Add"
                    title="Add Category"
                    onClick={handleAddCategory}
                  />
                  <img
                    src="/assets/media/icons/edit_btn.svg"
                    alt="Edit"
                    title="Edit Categories"
                    onClick={() => handleEditCategoryClick()}
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
                    (<InventoryBox
                      key={item.id}
                      handleInventoryBoxClick={() => handleInventoryBoxClick(item.id, item.name, item.picture, item.qty, item.desc)}
                      itemName={item.name}
                      itemImage={item.picture}
                      itemQuantity={item.qty}
                      itemDescription={item.desc}/>)
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Transaction History Section */}
          <div className="transaction-history">
              <h3 className="anybody" onClick={handleTransactionHistory} >Transaction History</h3>
                            
              {/* Added Transactions */}
              <div className="added-transactions">
              <ul>
                  {sortedTransactions
                    .filter(transaction => transaction.qtyAdded > 0)
                    .map(transaction => (
                      <li key={`added-${transaction.id}`} className="transaction-item">
                        <img src={transaction.itemImageUrl} alt={transaction.itemName} className="item-image" />
                        <span className="inter"> +{transaction.qtyAdded} </span>
                        <span className="inter">{transaction.itemName} </span>
                        <span className="inter">{transaction.date.toLocaleDateString()}</span>
                        <span className="inter">{transaction.date.toLocaleTimeString()}</span>
                      </li>
                    ))}
                </ul>
              </div>
                  
              {/* Used Transactions */}
              <div className="used-transactions" style={{ marginTop: '20px' }}>
                <ul>
                  {sortedTransactions
                    .filter(transaction => transaction.qtyUsed > 0)
                    .map(transaction => (
                      <li key={`used-${transaction.id}`} className="transaction-item">
                        <img src={transaction.itemImageUrl} alt={transaction.itemName} className="item-image" />
                        <span className="inter"> -{transaction.qtyUsed}</span>
                        <span className="inter">{transaction.itemName} </span>
                        <span className="inter">{transaction.date.toLocaleDateString()}</span>
                        <span className="inter">{transaction.date.toLocaleTimeString()}</span>
                      </li>
                    ))}
                </ul>
              </div>
          </div>    
      </div>
    </div>
    </div>
  );
}
