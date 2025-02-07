const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const unAuthorisedError = require("../utils/unAuthorisedError")

async function isLoggedIn (req,res,next){

    const token = req.cookies["authToken"];
    if(!token){
        return  res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth token provided"
        })
    }

    try{
        const decoded = jwt.verify(token,JWT_SECRET);

        if(!decoded){
            throw new unAuthorisedError();
        }
        //if reached here, then user is authenticated , then allow to access the api
        req.user ={
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
    }catch(error){
        return  res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid token provided"
        })
    }
    
}


// this function checks if the authenticated user is admin or not
// because we will call isAdmin after isLoggedIn thats why we will recievw the user details
function isAdmin(req,res,next) {
    const loggedInUser = req.user;
    if(loggedInUser.role == "ADMIN"){
        next();
    } else {
        return res.status(401).json({
            success: false,
            data:{},
            message: "You are not authorised for this action",
            error:{
                statusCode : 401,
                reason: "Unauthorised user for this action"
            }
        })
    }
    
}

module.exports = {
    isLoggedIn,
    isAdmin
}