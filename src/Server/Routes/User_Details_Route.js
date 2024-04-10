const express = require('express');
const router = express.Router();
const userd = require('../Controller/User_Details_Controller')
const {login, adduser, updatePassword, getUsers, getSpecificUser} = require('../Controller/User_Details_Controller')

router.post('/login',login);
router.post('/adduser', adduser)
router.put('/updatepassword', updatePassword)
router.get('/userdetails',userd.getUsers);
router.get('/userdetails/:email',userd.getSpecificUser);

module.exports = router; 