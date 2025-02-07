const { getCartByUserId } = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepository");
const BadRequestError = require("../utils/BadRequestError");
const notFoundError = require("../utils/notFoundError");

async function getCart(userId){

    const cart = await getCartByUserId(userId);
    if(!cart){
        throw new notFoundError("Cart");
    }
    return cart;
}


async function addToCart(userId,productId){
    const cart = await getCartByUserId(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new notFoundError("Product");
    }
    if(!product.inStock && product.quantity <=0){
        throw new BadRequestError(["Product not available in stock"]);
    }

    //maybe the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(item =>{
        if(item.product == productId){
            item.quantity += 1;
            foundProduct = true;
        }
    });

    if(!foundProduct){
        cart.items.push({
            product: productId,
            quantity: 1
        })
    }
    await cart.save();

    product.quantity -= 1;
    await product.save();
    return cart;
}

module.exports ={
    getCart,
    addToCart
}