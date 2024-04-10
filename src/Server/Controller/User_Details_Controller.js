const UserDetails = require("../Model/User_Details");
const ResourceAllocation = require("../Model/resources_model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "karthik@jmangroup.com",
    pass: "Jman@600113",
  },
});

// Function to handle user login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserDetails.findOne({ email });

    console.log("User :", user);

    if (!user) {
      console.log("No user found");
      return res.status(401).json({ message: "No user found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send response with user role and redirect path
    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function adduser(req, res) {
    try {
      const { firstname, lastname, email, password, mobile, role } = req.body;
  
      // Check if the email already exists
      const existingUser = await UserDetails.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Retrieve the count of documents in the UserDetails collection
      const userCount = await UserDetails.countDocuments({});
  
      // Create a new user document
      const newUser = new UserDetails({
        user_id: userCount + 1,
        firstname,
        lastname,
        email,
        password: await bcrypt.hash(password, 10), // Store the hashed password
        mobile,
        role,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Send email to the user
      await sendEmail(email, newUser.user_id);
  
      // Respond with success message
      res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      console.error("Error adding user:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async function sendEmail(email, userId) {
    try {
      // Construct the email message
      const mailOptions = {
        from: "karthik@jmangroup.com",
        to: email,
        subject: "Welcome to Our Website!",
        text: `Dear user, welcome to our website! Click the following link change the password : http://localhost:3000/updatepassword?userId=${userId}`,
      };
  
      // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw error; // Propagate the error to the caller
    }
  }
  
// Function to handle password update
async function updatePassword(req, res) {
  try {
    const { userId, newPassword } = req.body; // Extract userId and newPassword from request body

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Find the user by userId and update the password
    await UserDetails.findOneAndUpdate(
      { user_id: userId }, // Find user by userId
      { password: hashedPassword }, // Update password with hashedPassword
      { new: true } // Return the updated document
    );

    // Respond with success message
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Controller to get the details of user
async function getUsers(req, res){
  try {
    // Fetch all users from the database
    const users = await UserDetails.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

async function getSpecificUser(req, res){
  const { email } = req.params;

  try {
    const user = await UserDetails.findOne({ email });

    const resoureAllocation = await ResourceAllocation.find({ email });

    console.log(resoureAllocation)

    const projects = resoureAllocation.map(allocation => allocation.projectName);
    console.log('Pro ',projects)


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(!resoureAllocation){
      return res.status(404).json({ message: 'No project allocated' });
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      role: user.role,
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions
module.exports = {
  login,
  adduser,
  updatePassword,
  getUsers,
  getSpecificUser
};
