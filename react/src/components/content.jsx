// src/services/inventoryservices.jsx
export const fetchCategoryData = (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: `${category} item 1` },
          { id: 2, name: `${category} item 2` },
        ]);
      }, 1000);
    });
  };
  