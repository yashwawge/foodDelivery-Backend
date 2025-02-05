const express = require('express');
const cookieParser = require('cookie-parser');

const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRouter = require('./routes/authRoute');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}));

//Router middleware
//If your request start with users then handle it with userRouter
app.use('/users',userRouter);  //connects the router to the server
app.use('/carts',cartRouter);
app.use('/auth',authRouter);

app.listen(serverConfig.PORT, async ()=>{
    
    await connectDB();
    console.log(`server started at port: ${serverConfig.PORT}...!!`);

    // const newUser = await User.create({
    //     email: "abx@gmail.com",
    //     password: "1256890",
    //     firstName: "Johnathan",
    //     lastName: "Walter",
    //     mobileNumber:'0123456789'
    // });

    // console.log("Created new user");
    // console.log(newUser);
});

