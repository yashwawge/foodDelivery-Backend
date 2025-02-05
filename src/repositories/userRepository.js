const user = require('../schema/userSchema');


    async function findUser(parameters){
        try{
            const response = await user.findOne({...parameters});
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async function createUser(userDetails){
        try{
            const response  = await user.create(userDetails);
            return response;
        }catch(error){
            console.log(error);
        }
        
    }


module.exports ={
    findUser,
    createUser
};