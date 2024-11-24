import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // Mock user data, in a real app this would be fetched from an API or context
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Marine biologist passionate about ocean conservation.',
    profilePicture: 'https://via.placeholder.com/150'
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Handle the edit button click to navigate to the edit profile page
  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      </div>
      <button onClick={handleEdit} className="edit-button">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
