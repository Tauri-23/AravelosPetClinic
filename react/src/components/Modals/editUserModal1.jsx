import React, { useState } from 'react';
import "../../assets/css/editUserModal.css";

const EditUserModal = ({ user, onClose }) => {
  const [editData, setEditData] = useState({
    firstName: user.fname,
    middleName: user.mname,
    lastName: user.lname,
    email: user.email,
    currentPassword: user.password,
    birthday: user.bday,
    gender: user.gender,
    address: user.address,
    phone: user.phone,
    picture: user.picture,
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Include validation for both current password and new password
    if (!validatePassword(editData.currentPassword, editData.newPassword)) {
      return; // Prevent submission if validation fails
    }

    // Send API request to update user information
    axiosClient.put(`/update-user/${user.id}`, editData)
      .then(({ data }) => {
        if (data.status === 200) {
          notify('success', data.message, 'top-center', 3000);
          // Update the user's information in the parent component (if applicable)
          setUser(editData); // Assuming `setUser` is available in the parent component
          onClose();
        } else {
          notify('error', data.message, 'top-center', 3000);
        }
      })
      .catch(error => console.error(error));
  };

  const validatePassword = (currentPassword, newPassword) => {
    if (!currentPassword) {
      notify('error', 'Please enter your current password.', 'top-center', 3000);
      return false;
    }

    if (newPassword.length < 6) {
      notify('error', 'New password must be at least 6 characters long.', 'top-center', 3000);
      return false;
    }
    return true;
  };

  return (
    <div className="modal2">
      <div className="modal-box4">
        <div className="edit-user-modal">
          <h2>Edit User Information</h2>
          <form onSubmit={handleSave}>
            <div className="input-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={editData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={editData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={editData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender:</label>
              <select value={editData.gender}>
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
              </select>
              {/* <input
                type="text" // Adjust the input type as needed for gender selection
                id="gender"
                name="gender"
                value={editData.gender}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="input-group">
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date" // Use date input for birthdays
                id="birthday"
                name="birthday"
                value={editData.birthday} // Adjust date formatting as needed
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="picture">Profile Picture:</label>
              <input
                type="file"
                id="picture"
                name="picture"
                value={editData.picture}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={editData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={editData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="save-button">Save Changes</button>
            <button onClick={onClose} className="cancel-button">Cancel</button>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;