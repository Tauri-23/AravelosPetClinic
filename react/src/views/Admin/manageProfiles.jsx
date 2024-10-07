import React, { useState, useEffect } from 'react';

function manageProfiles() {
  const [users, setUsers] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = userId => {
    // Send a DELETE request to the backend API to delete the user
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful deletion
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSuspendUser = userId => {
    // Send a PATCH request to the backend API to suspend the user
    fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suspended: true })
    })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful suspension
          setUsers(users.map(user => (user.id === userId ? { ...user, suspended: true } : user)));
        } else {
          console.error('Error suspending user:', response.statusText);
        }
      })
      .catch(error => console.error('Error suspending user:', error));
  };

  const handleAddAdmin = () => {
    // Send a POST request to the backend API to add a new admin account
    fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newAdminEmail })
    })
      .then(response => {
        if (response.ok) {
          // Clear the new admin email field and update the user list
          setNewAdminEmail('');
          fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
        } else {
          console.error('Error adding admin:', response.statusText);
        }
      })
      .catch(error => console.error('Error adding admin:', error));
  };

  const handleDeleteAdmin = userId => {
    // Send a DELETE request to the backend API to delete the admin account
    fetch(`/api/admins/${userId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful deletion
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Error deleting admin:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting admin:', error));
  };

  return (
    <div>
      <h2>User Management</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.suspended ? 'Suspended' : 'Active'}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                {user.role !== 'admin' && (
                  <button onClick={() => handleSuspendUser(user.id)}>Suspend</button>
                )}
                {user.role === 'admin' && (
                  <button onClick={() => handleDeleteAdmin(user.id)}>Delete Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Add New Admin</h3>
        <input type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} />
        <button onClick={handleAddAdmin}>Add Admin</button>
      </div>
    </div>
  );
}

export default manageProfiles;