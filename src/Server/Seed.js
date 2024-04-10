const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user_details = require('./Model/User_Details');

mongoose.connect('mongodb://localhost:27017/FinalBoss')
.then(() => {
    console.log('Connected to DB');
    seedUsers();
})
.catch(error => console.log('Error connecting to DB : ', error));

const seedUsers = async () => {
    try {
        const usersData = [
            {
                user_id: 1,
                firstname: 'Karthik',
                lastname: 'Mohan',
                email: 'karthik@gmail.com',
                password: await bcrypt.hash('password123', 10), // Hash the password
                role: 'Admin'
            }
        ];
    
        await user_details.insertMany(usersData);
        console.log('Seed data added successfully');
    } catch (error) {
        console.error('Error seeding data: ', error);
    } finally {
        mongoose.connection.close();
    }    
};
