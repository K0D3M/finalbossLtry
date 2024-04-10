const express = require('express');
const FeedbackController = require('../Controller/feedback_controller');
const router = express.Router();

router.post('/general', FeedbackController.generalcreateFeedback);
router.get('/getdetails/:role/:username',FeedbackController.getdetails);
module.exports = router;
