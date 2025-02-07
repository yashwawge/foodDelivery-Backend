const express = require("express");
const { getCartByUser, addProductToCart } = require("../controllers/cartController");
const { isLoggedIn } = require("../validation/authValidation");

const cartRouter = express.Router();

cartRouter.get("/",isLoggedIn,getCartByUser);

cartRouter.post("/add/:product",isLoggedIn,addProductToCart)

module.exports = cartRouter;