import React, { useState } from 'react';
import "../../assets/css/editUserModal.css";

const EditUserModal = ({ user, onClose }) => {
  const [editMode, setEditMode] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    email: false,
    gender: false,
    birthday: false,
    phone: false,
    address: false,
    picture: false,
    currentPassword: false,
  });

  const [editData, setEditData] = useState({ ...user }); // Create a shallow copy

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEditData({ ...editData, [name]: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditClick = (fieldName) => {
    setEditMode((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleSaveField = async (fieldName) => {
    // Implement validation for the specific field if necessary
    // For example, validate email format, password strength, etc.

    // Prepare the data to be sent
    const updatedField = { [fieldName]: editData[fieldName] };

    try {
      // Example API call (replace with your actual API endpoint and method)
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if required
        },
        body: JSON.stringify(updatedField),
      });

      if (response.ok) {
        // Optionally, you can update the user state in the parent component
        // Notify the user of success
        setEditMode((prev) => ({ ...prev, [fieldName]: false }));
        // Optionally refresh user data or inform parent component
      } else {
        // Handle server errors
        console.error('Failed to update the field.');
      }
    } catch (error) {
      console.error('Error updating the field:', error);
    }
  };

  const toggleCurrentPassword = () => {
    setEditMode((prev) => ({
      ...prev,
      currentPassword: !prev.currentPassword,
    }));
  };

  const renderInputField = (fieldName, label, type = 'text') => (
    <div className="input-group">
      <label htmlFor={fieldName}>{label}:</label>
      {editMode[fieldName] ? (
        <>
          {type === 'select' ? (
            <select
              id={fieldName}
              name={fieldName}
              value={editData[fieldName]}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : type === 'date' ? (
            <input
              type="date"
              id={fieldName}
              name={fieldName}
              value={editData[fieldName]}
              onChange={handleInputChange}
            />
          ) : type === 'file' ? (
            <input
              type="file"
              id={fieldName}
              name={fieldName}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type={type}
              id={fieldName}
              name={fieldName}
              value={editData[fieldName]}
              onChange={handleInputChange}
            />
          )}
          <button
            type="button"
            onClick={() => handleSaveField(fieldName)}
            className="update-button"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() =>
              setEditMode((prev) => ({ ...prev, [fieldName]: false }))
            }
            className="cancel-edit-button"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="field-value">
            {type === 'file' && editData[fieldName]
              ? editData[fieldName].name
              : editData[fieldName] || 'N/A'}
          </span>
          <button
            type="button"
            onClick={() => handleEditClick(fieldName)}
            className="edit-button"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );

  const renderPasswordInput = () => (
    <div className="input-group">
      <label htmlFor="currentPassword">Current Password:</label>
      {editMode.currentPassword ? (
        <>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={editData.currentPassword || ''}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={() => handleSaveField('currentPassword')}
            className="update-button"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() =>
              setEditMode((prev) => ({ ...prev, currentPassword: false }))
            }
            className="cancel-edit-button"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="field-value">********</span>
          <button
            type="button"
            onClick={toggleCurrentPassword}
            className="edit-button"
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="modal2">
      <div className="modal-box4">
        <div className="edit-user-modal">
          <h2>Edit User Information</h2>
          <form>
            {renderInputField('firstName', 'First Name')}
            {renderInputField('middleName', 'Middle Name')}
            {renderInputField('lastName', 'Last Name')}
            {renderInputField('email', 'Email', 'email')}
            {renderInputField('gender', 'Gender', 'select')}
            {renderInputField('birthday', 'Birthday', 'date')}
            {renderInputField('phone', 'Phone Number', 'tel')}
            {renderInputField('address', 'Address')}
            {renderInputField('picture', 'Profile Picture', 'file')}
            {renderPasswordInput()}
            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-button"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
