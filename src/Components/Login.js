import React, { useState } from "react";
import './CSS/login.css'
import {
  TextField,
  Button,
  Link,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password check
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      // Send form data to server
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Parse response JSON
      const data = await response.json();

      // Redirect based on user role
      if (data.role === "Admin") {
        // Redirect to addUser.js
        // You can use history.push('/addUser') if you're using React Router
        alert("Logged in successfully");
        window.location.href = "/admindash";
      } else {
        // Redirect to demo.js
        alert("Logged in successfully");
        window.location.href = "/userdash";
      }
      localStorage.setItem('Email',email);
    } catch (error) {
      console.error("Authentication failed:", error.message);
      alert("Authentication failed : " + error.message);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          {/* <img src= alt="Image" style={{ width: "100%", marginTop: "13%" }} /> */}
        </Grid>
        <Grid item md={6} xs={12} style={{marginTop: "11.7%"}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc", // Add border to the Box
              padding: "20px",
              borderRadius: "5px", // Add border-radius for rounded corners
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Add box shadow for depth
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
