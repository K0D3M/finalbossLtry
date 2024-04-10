const generalFeedback = require('../Model/general_feedback_model');

const feedbackController = {};

// Controller function to add senior developer feedback
feedbackController.generalcreateFeedback = async (req, res) => {
  try {
    const {
      username,
      role,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    } = req.body;

    const feedback = new generalFeedback({
      username,
      role,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    });

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ success: false, message: 'Error adding feedback' });
  }
};


  //Controller to send data about feedback to front end
  feedbackController.getdetails = async (req, res) => {
    try {
      const role = req.params.role;
      const username = req.params.username;
      console.log("Role : ", role);
      console.log("Username : ", username);
  
      let feedbackDetails;
  
      // Choose the appropriate model based on the role
      switch (role.toLowerCase()) {
        case 'intern':
        case 'Intern':
          console.log('Inside Intern');
          feedbackDetails = await InternFeedback.find({ username });
          break;
        case 'senior developer':
        case 'Senior Developer':
          console.log('Inside General');
          feedbackDetails = await generalFeedback.find({ username });
          break;
        case 'consultant':
        case 'Consultant':
          console.log('Inside Consultant');
          feedbackDetails = await consultantFeedback.find({ username });
          break;
        case 'tribemaster':
        case 'Tribemaster':
          console.log('Inside Tribemaster');
          feedbackDetails = await tribemasterFeedback.find({ username });
          break;
        default:
          return res.status(400).json({ success: false, message: 'Invalid role' });
      }
  
      if (!feedbackDetails) {
        return res.status(404).json({ success: false, message: 'Feedback details not found' });
      }
  
      console.log("FeedbackDetails", feedbackDetails);
      res.status(200).json({ success: true, data: feedbackDetails });
    } catch (error) {
      console.error('Error fetching feedback details:', error);
      res.status(500).json({ success: false, message: 'Error fetching feedback details' });
    }
  };
  

module.exports = feedbackController;
