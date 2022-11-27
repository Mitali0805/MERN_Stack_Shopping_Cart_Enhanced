const express = require('express');
const router = express.Router();

const { create,productById, read ,remove , update ,list , listSearch ,listBySearch, photo , listRelated, listCategories} = require('../controllers/products');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { userById } = require('../controllers/user');

/**
* @swagger
* /api/product/606189dad5f3f57b24043ead:
*    get:
*       tags:
*       summary: Get the product.
*       description: User can read the products
*       responses: 
*            200:
*               description: Received the list of products.
*/
router.get('/product/:productId',read);

/**
* @swagger
* /api/product/create/5f4044ac957b7463541efedb:
*    post:
*       tags:
*       summary: Creates the product.
*       description: Admin can create the products
*       responses: 
*            200:
*               description: Created the product.
*/
router.post('/product/create/:userId',requireSignin, isAdmin, isAuth,create);

/**
* @swagger
* /api/product/5f4ca4f1fee4fa4498eada9b/5f4044ac957b7463541efedb:
*    delete:
*       tags:
*       summary: Delete the product.
*       description: Admin can delete the products
*       responses: 
*            200:
*               description: Deleted the product.
*/
router.delete('/product/:productId/:userId',
               requireSignin,
                isAdmin, isAuth,
                remove);

/**
* @swagger
* /api/product/5f4ca4f1fee4fa4498eada9b/5f4044ac957b7463541efedb:
*    put:
*       tags:
*       summary: Updates the product.
*       description: This is where the admin can update the product
*       responses: 
*            200:
*               description: Updates the product.
*/                
router.put('/product/:productId/:userId',
               requireSignin,
                isAdmin, isAuth,
                update);                

/**
* @swagger
* /api/products:
*    get:
*       tags:
*       summary: list of products.
*       description: User get list of products
*       responses: 
*            200:
*               description: Received the list of products.
*/                
router.get('/products',list); 

/**
* @swagger
* /api/products/search:
*    get:
*       tags:
*       summary: Search the products.
*       description: User can search the products
*       responses: 
*            200:
*               description: Received the searched products.
*/
router.get("/products/search", listSearch);

/**
* @swagger
* /api/products/by/search:
*    post:
*       tags:
*       summary: List by Search.
*       description: list is searched.
*       responses: 
*            200:
*               description: Received the searched list.
*/
router.post("/products/by/search", listBySearch);

/**
* @swagger
* /api/product/photo/5f4ca4f1fee4fa4498eada9b:
*    get:
*       tags:
*       summary: Product Photo.
*       description: This is where photo of the product is displayed
*       responses: 
*            200:
*               description: Received the product photo.
*/
router.get("/product/photo/:productId",photo);           

router.param("userId",userById);
router.param("productId",productById);

router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);

module.exports = router;