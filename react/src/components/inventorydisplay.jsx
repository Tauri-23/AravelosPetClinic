import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryData } from "../components/inventory_box"; // Correct the path if necessary

const {showModal} = useModal();


showModal('',{});

const InventoryDisplay = () => {
  const [items, setItems] = useState([]);
  const { category } = useParams(); // Get the category from the URL

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        const data = await fetchCategoryData(category); // Fetch data for the category
        setItems(data); // Set fetched items in state
      }
    };
    fetchData();
  }, [category]); // Re-run when the category changes

  return (
    <div>
      <h2>{category} Items</h2>
      <div className="inventory-boxes">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="inventory-box">
              {item.name}
            </div>  
          ))
        ) : (
          <p>No items available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryDisplay;
