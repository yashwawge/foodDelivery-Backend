const user = require('../schema/userSchema');

class UserRepository{

    async findUser(parameters){
        try{
            const response = await user.findOne({...parameters});
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async createUser(userDetails){
        try{
            const response  = await user.create(userDetails);
            return response;
        }catch(error){
            console.log(error);
        }
        
    }

}

module.exports = UserRepository;