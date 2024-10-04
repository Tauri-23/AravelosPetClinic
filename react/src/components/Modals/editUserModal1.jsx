import React, { useState } from 'react';

const EditUserModal = ({ user, onClose }) => {
  const [editData, setEditData] = useState({
    ...user // Initialize editData with the current user data
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Send API request to update user information
    axiosClient.put(`/update-user/${user.id}`, editData)
      .then(({ data }) => {
        if (data.status === 200) {
          notify('success', data.message, 'top-center', 3000);
          // Update the user's information in the parent component
          setUser(editData);
          onClose();
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="edit-user-modal">
      <h2>Edit User Information</h2>
      <form onSubmit={handleSave}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={editData.name} onChange={handleInputChange} />
        </div>
        {/* Add other input fields for email, gender, birthday, address, and phone */}
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUserModal;