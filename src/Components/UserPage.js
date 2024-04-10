import { useNavigate } from 'react-router-dom';
import './CSS/UserPage.css';

function UserDashboard() {
  const navigate = useNavigate();
  const handleTimeSheet = () => {
     navigate('/timesheet');
  };

  const handleFeedbackHistory = () => {
     navigate('/feedbacks');
  };

  const handleProjectHistory = () => {
    navigate('/projects');
 };

  const handleLogOut = () => {
    navigate('/')
  };

  return (
    <div className="user-box">
      <div className="user-dashboard-container">
        <h2 className="user-heading">User Dashboard</h2>
        <div className="user-buttons">
          <button className="user-button" onClick={handleTimeSheet}>TimeSheet</button>
          <button className="user-button" onClick={handleFeedbackHistory}>Feedback History</button>
          <button className="user-button" onClick={handleProjectHistory}>Project History</button>
          <button className="user-button" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
