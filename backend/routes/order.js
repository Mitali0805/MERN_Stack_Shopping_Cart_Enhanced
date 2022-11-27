const express = require('express');
const router = express.Router();

const { requireSignin , isAuth , isAdmin} = require("../controllers/auth"); 
const { userById , addOrderToUserHistory } = require("../controllers/user"); 
const { create , listOrders, getStatusValues , updateOrderStatus , getFeedback,updateFeedback,orderById} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/products");

/**
* @swagger
* /api/order/create/5f4044ac957b7463541efedb:
*    post:
*       tags:
*       summary: Create the order.
*       description: user can create the order
*       responses: 
*            200:
*               description: Order is created.
*/
router.post('/order/create/:userId',
             requireSignin, isAuth,
              addOrderToUserHistory ,
              decreaseQuantity,
              create
            );

            
/**
* @swagger
* /api/order/list/5f4044ac957b7463541efedb:
*    get:
*       tags:
*       summary: List of orders
*       description: user can see the list of orders
*       responses: 
*            200:
*               description: Order List is displayed.
*/
router.get('/order/list/:userId',requireSignin,isAuth,isAdmin, listOrders);
  
router.get('/order/status-values/:userId',requireSignin,isAuth,isAdmin, getStatusValues);

router.put('/order/:orderId/status/:userId',requireSignin,isAuth,isAdmin, updateOrderStatus);

router.get('/order/feedback/:userId',requireSignin,isAuth,getFeedback);

router.put('/order/:orderId/feedback/:userId',requireSignin,isAuth,updateFeedback);


router.param('userId',userById);
router.param('orderId',orderById);
module.exports = router;