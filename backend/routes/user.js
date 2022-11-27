const express = require('express');
const router = express.Router();

const { userById, read, update, purchaseHistory } = require("../controllers/user"); 
const { requireSignin , isAuth , isAdmin} = require("../controllers/auth"); 


router.get('/secret/:userId',requireSignin, isAuth , isAdmin ,(req,res)=>{
    res.json({
        user:req.profile
    });
});

/**
* @swagger
* /api/user/5f4044ac957b7463541efedb:
*    get:
*       tags:
*       summary: Get the user.
*       description: Details of user is displayed
*       responses: 
*            200:
*               description: Received the details of user.
*/
router.get('/user/:userId',requireSignin,isAuth,read);

/**
* @swagger
* /api/user/5f4044ac957b7463541efedb:
*    put:
*       tags:
*       summary: Updates the user.
*       description: This is where user can update its details
*       responses: 
*            200:
*               description: Updation is done.
*/
router.put('/user/:userId',requireSignin,isAuth,update)

/**
* @swagger
* /api/orders/by/user/5f4044ac957b7463541efedb:
*    get:
*       tags:
*       summary: Displays the purchase history of the user.
*       description: This is where you can see the purchase history of user
*       responses: 
*            200:
*               description: Purchase History is displayed.
*/
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId',userById); //middleware

module.exports = router;