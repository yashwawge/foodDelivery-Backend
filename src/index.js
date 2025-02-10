const express = require('express');
const cookieParser = require('cookie-parser');

const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRouter = require('./routes/authRoute');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');

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
app.use('/products',productRouter);
app.use('/orders',orderRouter);

app.post('/photo',uploader.single('incomming file') ,async (req,res)=>{

    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary: ",result);
    await fs.unlink(req.file.path);
    return res.json({message: 'ok'});
})

app.listen(serverConfig.PORT, async ()=>{
    
    await connectDB();
    console.log(`server started at port: ${serverConfig.PORT}...!!`);

});

