const express = require("express");
const { getCartByUser, modifyProductToCart } = require("../controllers/cartController");
const { isLoggedIn } = require("../validation/authValidation");

const cartRouter = express.Router();

cartRouter.get("/",isLoggedIn,getCartByUser);

cartRouter.post("/:operation/:productId",isLoggedIn,modifyProductToCart)

module.exports = cartRouter;