import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../Styles/FeedbackHistory.css';

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Feedback</h5>
        <ul className="list-group list-group-flush">
          {Object.entries(feedback).map(([key, value], index) => (
            <li key={index} className="list-group-item">
              <strong>{key}: </strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FeedbackHistory = ({ email }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
  
    useEffect(() => {
      const fetchUsername = async () => {
        try {
          const email = localStorage.getItem('Email');
          const response = await axios.get(`http://localhost:5000/api/users/userdetails/${email}`);
          setUsername(response.data.firstName);
          setRole(response.data.role);
          console.log("UserName", response.data.firstName);
          console.log("Role", response.data.role);
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      };
  
      fetchUsername();
    }, [email]);
  
    useEffect(() => {
      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/feedback/getdetails/${role}/${username}`);
          console.log(response.data);
          setFeedbacks(response.data.data); // Assuming response.data contains the feedbacks array
        } catch (error) {
          console.error('Error fetching feedbacks:', error);
        }
      };
  
      fetchFeedbacks();
    }, [username, role]); // Update the useEffect dependencies
  
    return (
      <div className="feedback-list">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </div>
    );
  };
  
export default FeedbackHistory;

