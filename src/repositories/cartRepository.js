const Cart = require("../schema/cartSchema");
const internalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");

async function createCart(userId){

    try{

        const newCart = await Cart.create({
            user: userId,
        })
        return newCart;
    }catch(error){
        if(error.name == 'ValidationError'){

            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new internalServerError();
    }
}

async function getCartByUserId(userId) {
    try{

        const cart = await Cart.findOne({
            user :userId
        }).populate('items.product');
        return cart;

    }catch(error){
        console.log(error);
        throw new internalServerError();
    }
}

async function clearCart(userId){
    try{
  
        const cart = await Cart.findOne({
            user:userId
        });
        if(!cart){
            throw new notFoundError("Cart");
        }
        cart.items = [];

        await cart.save();
        return cart;
    }catch(error){
      console.log(error);
      throw new internalServerError();
    }
  }
  
module.exports ={
     createCart,
     getCartByUserId,
     clearCart
    };