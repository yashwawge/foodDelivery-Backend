const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

/**
 * The below function helps us to connect to the mongodb server
 */
async function connectDB(){
    try{
        mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connected to mongodb server...");
    }catch(error){
        console.log("Not able to connect to mongodb server!!");
        console.log(error);
    }
}

module.exports = connectDB;