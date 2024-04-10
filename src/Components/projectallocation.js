// Import necessary modules
import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import './CSS/projectallocation.css'; // Import CSS file for styling

// Functional component for adding a new project
const AllocateProject = () => {
  // State variables to hold form input values
  const [id, setProjectId] = useState(''); // State for project ID
  const [name, setProjectName] = useState(''); // State for project name
  const [domain, setProjectDomain] = useState(''); // State for project domain
  const [startDate, setStartDate] = useState(''); // State for project start date
  const [endDate, setEndDate] = useState(''); // State for project end date
  const [complexity, setPriority] = useState(''); // State for project priority

  // Function to handle adding a new project
  const handleAddProject = async () => {
    try {
      // Check if required fields are filled out
      if (!id || !name || !domain) {
        alert('Please fill out all required fields.');
        return;
      }
      // Create a new project object with form data
      const newProject = {
        id,
        name,
        domain,
        startDate,
        endDate,
        complexity
      };

      // Make POST request to backend API to add the project
      await axios.post('http://localhost:5000/api/projects/add', newProject);
      
      // Notify user that project has been added successfully
      alert('Project added successfully!');
      
      // Reset form fields after adding project
      setProjectId('');
      setProjectName('');
      setProjectDomain('');
      setStartDate('');
      setEndDate('');
      setPriority('');
    } catch (error) {
      // Handle error if POST request fails
      console.error('Error adding project:', error);
      // Notify user about the error
      alert('Error adding project. Please try again later.');
    }
  };

  // JSX to render the form for adding a new project
  return (
    <div className="add-project-container"> 
      <h2>Add Project</h2>
      <label>Project ID:</label>
      <input type="text" value={id} onChange={(e) => setProjectId(e.target.value)} />
      <label>Project Name:</label>
      <input type="text" value={name} onChange={(e) => setProjectName(e.target.value)} />
      <label>Project Domain:</label>
      <select value={domain} onChange={(e) => setProjectDomain(e.target.value)}>
        <option value="">Select Domain</option>
        <option value="FullStack">FullStack</option>
        <option value="Data Engineering & Warehousing">Data Engineering & Warehousing</option>
        <option value="Data Science & Analytics">Data Science & Analytics</option>
      </select>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <label>Complexity:</label>
      <select value={complexity} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Complexity</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
};

// Export the AddProject component
export default AllocateProject;
