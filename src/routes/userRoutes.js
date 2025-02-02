const express = require("express");
const { createUser } = require("../controllers/userController");

//we have to initialize a router object to add routes in a new file
//routers are use for seggregating your routes in different modules
const userRouter  =  express.Router();

userRouter.post('/',createUser);//this is route registration

module.exports = userRouter;