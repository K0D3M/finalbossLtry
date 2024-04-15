const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const Authentication_Router = require('./Routes/User_Details_Route')

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/FinalBoss')
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log('Error connecting to DB : ,' .error));

app.use("/auth", Authentication_Router)

const bodyParser = require('body-parser');
const projectRoutes = require('./Routes/project_allocation_routes');
const resourceAllocationRoutes = require('./Routes/resource_allocation_routes');
const feedbackRoutes = require('./Routes/feedback_routes');
const timeSheet=require("./Routes/timesheet_routes")

const PORT = 5000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FinalBoss', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

app.use('/auth/adduser', Authentication_Router); // POST request for adding a new

app.use('/auth/updatepassword', Authentication_Router);
//Mount add project routes
app.use('/api/projects', projectRoutes);

//Mount resource allocation routes
app.use('/api/resources', resourceAllocationRoutes);

//Mount user details routes
app.use('/api/users', Authentication_Router);

// //Mount feedback routes 
app.use('/api/feedback', feedbackRoutes);

// //Mount timesheet
app.use('/api/timesheet',timeSheet)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});