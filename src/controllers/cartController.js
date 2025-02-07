const { getCart, modifyCart} = require("../services/cartService");
const AppError = require("../utils/appErrors");

async function getCartByUser(req,res){
    try{

        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            data: cart,
            error:{},
            message:"Succesfully fetched the cart"
        });
    }catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message:error.message,
                error:error,
                data:{}
            })
        }
        return res.status(500).json({
            success : false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}

async function modifyProductToCart(req,res){
    try{

        const cart = await modifyCart(req.user.id , req.params.productId,req.params.operation == "add");
        return res.status(200).json({
            success: true,
            data: cart,
            error:{},
            message:"Succesfully added product to the cart"
        });
    }catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message:error.message,
                error:error,
                data:{}
            })
        }
        return res.status(500).json({
            success : false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart
}