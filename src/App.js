import Login from './Components/Login';
import UserCreation from './Components/UserCreation';
import UpdatePassword from './Components/UpdatePassword';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimeSheet from './Components/timesheet';
import AdminDashboard from './Components/admindashboard';
import AllocateProject from './Components/projectallocation';
import AllocateResource from './Components/resourceallocation';
import ProjectHistory from './Components/ProjectHistory';
import FeedbackHistory from './Components/FeedbackHistory';
import UserDashboard from './Components/UserPage';
import GeneralFeedbackForm from './Components/feedback';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admindash' element={<AdminDashboard />} />
          <Route path='/userdash' element={<UserDashboard/>} />
          <Route path='/project_allocation' element={<AllocateProject />} />
          <Route path='/user_creation' element={<UserCreation />} />
          <Route path='/resource_allocation' element={<AllocateResource />}/>
          <Route path='/updatepassword' element={<UpdatePassword />} />
          <Route path='/timesheet' element={<TimeSheet />} />
          <Route path='/projects' element={<ProjectHistory />} />
          <Route  path="/feedback" element={<GeneralFeedbackForm />} />
          <Route path='/feedbacks' element={<FeedbackHistory />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
