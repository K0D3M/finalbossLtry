const express = require('express');
const router = express.Router();
const projectController = require('../Controller/projectscontroller');

router.post('/allocate-resources', projectController.allocateResources);
router.get('/getResources/:responseEmail', projectController.getResources);
module.exports = router;
