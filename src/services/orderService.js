const {getCartByUserId, clearCart} = require("../repositories/cartRepository");
const notFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/BadRequestError");
const {findUser} = require("../repositories/userRepository");
const { createNewOrder, getOrderByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository");
const internalServerError = require("../utils/internalServerError");

async function createOrder(userId, paymentMethod){

    const cart = await getCartByUserId(userId);
    const user = await findUser({_id: cart.user});

    if(!cart){
        throw new notFoundError();
    }

    if(cart.items.length === 0){
        throw new BadRequestError(["Cart is empty, please add some items to the cart"])
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {product: cartitem.product._id , quantity: cartitem.quantity}
    });

    orderObject.status ="ORDERED";
    orderObject.totalPrice =0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    })

    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;


    const order = await createNewOrder(orderObject);

    if(!order){
        throw new internalServerError();
    }

    await clearCart(userId);

    return order;

}

async function getAllOrdersCreatedByUser(userId){
   const orders = await getOrderByUserId(userId);
   if(!orders){
    throw new notFoundError("Orders");
   }
   return orders;
}


async function getOrderDetailsById(orderId){
    const order = await getOrderById(orderId);
    if(!order) {
        throw new notFoundError("Orders");
    }
    return order;
 }
async function updateOrder(orderId,status){
    const order = await updateOrderStatus(orderId, status);
    if(!order) {
        throw new notFoundError("Orders");
    }
    return order;
}


module.exports ={
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
}