import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box, Typography} from '@mui/material';

export default function UserCreation() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const password = 'defaultone'
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/adduser/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password, mobile, role }),
      });
  
      if (response.ok) {
        // Handle success
        alert("User created successfully")
        console.log('User created successfully');
      } else {
        // Handle error
        const errorData = await response.json(); // Parse error response
        console.error('Failed to create user:', errorData.message); // Log error message
        // Display error message to the user (e.g., show in UI)
        alert(`Failed to create user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle network or other unexpected errors
      alert('Failed to create user. Please try again later.');
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc', // Add border to the Box
            padding: '20px',
            borderRadius: '5px', // Add border-radius for rounded corners
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' // Add box shadow for depth
        }}
      >
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={handleRoleChange}
              label="Role"
              required
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
              <MenuItem value="Jr.Developer">Jr.Developer</MenuItem>
              <MenuItem value="Sr.Developer">Sr.Developer</MenuItem>
              <MenuItem value="Solutions Consultant">Solutions Consultant</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
      </form>
      </Box>
    </Container>
  );
}
