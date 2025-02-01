const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true , "First Name is required"],
        minlength: [5, "First Name can be atleast of 5 letters"],
        lowercase: true,
        trim: true,
        maxlength:[20, "First Name should be less than 20 letters"]
    },

    lastName: {
        type: String,
        required: [true , "First Name is required"],
        minlength: [5, "First Name can be atleast of 5 letters"],
        lowercase: true,
        trim: true,
        maxlength:[20, "First Name should be less than 20 letters"]
    },

    mobileNumber: {
        type: String,
        trim: true,
        maxlength:[10, "Phone number should be of length 10"],
        minlength:[10, "Phone number should be of length 10"],
        unique: [true,"Phone number already exists"],
        required: [true,"Phone number should be provided"]
    },

    email: {
        type: String,
        trim:true,
        required:[true,"Email should be provided"],
        unique: [true,"Email already exists"],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },

    password: {
        type: String,
        required:[true,"Password should be provided"],
        minlength:[6,"Password should be atleast 6 character long"]
    }

},{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports = User ;
