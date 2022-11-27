const express = require('express');
const router = express.Router();

const { create,categoryById ,read ,update,remove,list} = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');;

const { userById} = require('../controllers/user'); 

/**
* @swagger
* /api/category/5f4ec9985a7a0ebda81b9462:
*    get:
*       tags:
*       summary: Get the single category.
*       description: You can read the single category based on category id
*       responses: 
*            200:
*               description: Received the One category.
*/
router.get('/category/:categoryId',read);

/**
* @swagger
* /api/categories:
*    get:
*       tags:
*       summary: Get all category.
*       description: You can get all categories
*       responses: 
*            200:
*               description: Received the all category.
*/
router.get('/categories',list);

//only admin access
/**
* @swagger
* /api/category/create/5f40434c957b7463541efeda:
*    post:
*       tags:
*       summary: Create category.
*       description: This is where admin can create the category
*       responses: 
*            200:
*               description: Category is created.
*/
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);

/**
* @swagger
* /api/category/5f4ec9985a7a0ebda81b9462/5f40434c957b7463541efeda:
*    put:
*       tags:
*       summary: Updation of category.
*       description: This is where you can update the categort
*       responses: 
*            200:
*               description: Update of category is done.
*/
router.put('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,update);

/**
* @swagger
* /api/category/5f4ec9985a7a0ebda81b9462/5f40434c957b7463541efeda:
*    delete:
*       tags:
*       summary: Deletion of categories.
*       description: This is where admin can delete the category
*       responses: 
*            200:
*               description: Category is deleted.
*/
router.delete('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,remove);


router.param ("categoryId",categoryById);
router.param("userId",userById);

module.exports = router