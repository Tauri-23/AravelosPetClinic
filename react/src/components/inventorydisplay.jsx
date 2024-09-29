import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryData } from "../components/content.jsx"; // Ensure the path is correct

const InventoryDisplay = ({ category }) => {
  const [items, setItems] = useState([]);
  const { category: paramCategory } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategoryData(category || paramCategory);
      setItems(data);
    };
    fetchData();
  }, [category, paramCategory]);

  return (
    <div>
      <h2>{category || paramCategory} Items</h2>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default InventoryDisplay;
