const express = require("express");
const { isLoggedIn, isAdmin } = require("../validation/authValidation");
const {createNewOrder, getAllOrdersByUser, getOrder, cancelOrder, changeOrderstatus} = require("../controllers/orderController")

const orderRouter = express.Router();

orderRouter.post("/",isLoggedIn,createNewOrder);
orderRouter.get("/",isLoggedIn,getAllOrdersByUser);
orderRouter.get("/:orderId",isLoggedIn,getOrder);
orderRouter.put("/:orderId/cancel",isLoggedIn,cancelOrder);
orderRouter.put("/:orderId/status",isLoggedIn,isAdmin,changeOrderstatus);

module.exports = orderRouter;