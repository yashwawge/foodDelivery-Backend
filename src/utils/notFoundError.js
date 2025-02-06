const AppError = require("./appErrors");

class notFoundError extends AppError {
    constructor(resource){
        super(`Not able to find ${resource}`,404)
    }
}

module.exports = notFoundError;