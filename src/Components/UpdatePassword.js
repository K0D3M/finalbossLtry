import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UpdatePassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation on new password and confirm password
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      // Submit password change request to the server
      const response = await fetch('http://localhost:5000/auth/updatepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          newPassword: newPassword,
        }),
      });
  
      if (response.ok) {
        // Access the response body as JSON
        const responseBody = await response.json();
        
        // Log the success message from the server
        console.log('Success message:', responseBody.message);
      
        // Return the success message
        return responseBody.message;
      } else {
        // Access the response body as JSON
        const responseBody = await response.json();
        
        // Log the error message from the server
        console.log('Error message:', responseBody.message);
      
        // Throw an error indicating that password update failed
        throw new Error('Failed to update password');
      }
      

      
      alert('Password updated successfully.. We will redirect you to Login page')
      window.location.href = '/login'
      console.log('Password updated successfully');
  
      // Clear the input fields after successful submission
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error.message);
      alert('Failed to update password. Please try again.');
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <h2>Change Password</h2>
      <p>User ID: {userId}</p>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            variant="outlined"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            sx={{ marginBottom: '10px' }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
