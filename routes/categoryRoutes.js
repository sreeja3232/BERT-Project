const express = require('express')
const { requireSignIn, isAdmin } = require('./../middleswares/authmiddlewares');
const { createCategoryController, updateCategoryController, getAllCategories, singleCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
router.get('/get-categories', getAllCategories);
router.get('/single-category/:slug', singleCategory);
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategory);


module.exports = router
