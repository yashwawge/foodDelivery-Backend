const AppError = require("./appErrors");

class UnauthorisedError extends AppError {
    constructor(){
        super(`User is not authorised properly`,401)
    }
}

module.exports = UnauthorisedError;