const express = require("express");
const { login } = require("../controllers/authController");

//we have to initialize a router object to add routes in a new file
//routers are use for seggregating your routes in different modules
const authRouter  =  express.Router();

authRouter.post('/login',login);//this is route registration

module.exports = authRouter;