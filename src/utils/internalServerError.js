const AppError = require("./appErrors");

class internalServerError extends AppError {
    constructor(){
       
        super(`It's not you it's our server where Something went wrong`,500)
    }
}

module.exports = internalServerError;