class UserService{


    constructor(_userRepository){
        //In the argument we will expect use repository object
        this.userRepository = _userRepository;
    }
    async registerUser(userDetails){
        //IT will create a new user in the database

        //1.we need to check if this user already exists or not
        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobileNumber:  userDetails.mobileNumber
        })

        if(user){
            //we found user
            throw{
                reason: "User with the given mobile number and email already exists",
                statusCode: 400
            }
        }
        //2.If not create a user in the database
        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber:  userDetails.mobileNumber
        });

        if(!newUser){
            throw{reason:'something went wrong, cannot create user',statusCode: 500};
        }

        //3.return the details of created  user
        return newUser;
    }
}
module.exports = UserService;