const express = require("express");
const { login, logout } = require("../controllers/authController");

//we have to initialize a router object to add routes in a new file
//routers are use for seggregating your routes in different modules
const authRouter  =  express.Router();

authRouter.post('/login',login);//this is route registration
authRouter.post('/logout',logout);

module.exports = authRouter;