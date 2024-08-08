const express = require('express')
const { requireSignIn, isAdmin } = require('./../middleswares/authmiddlewares');
const { createRestaurant, getRestaurants, getSingleRestaurant, getrestaurantPhoto, deleteRestaurant, updateRestaurant, searchReataurant, allReviews } = require('../controllers/RatingController');
const router = express.Router();
const formidable = require('express-formidable');
//routes
router.post('/create-restaurant', requireSignIn, isAdmin, formidable(), createRestaurant);
router.put('/update-restaurant/:rid', requireSignIn, isAdmin, formidable(), updateRestaurant);
router.get('/get-restaurants', getRestaurants);
router.get('/get-restaurant/:slug', getSingleRestaurant);
router.get('/restaurant-photo/:slug', getrestaurantPhoto);
router.delete('/delete-restaurant/:rid', deleteRestaurant);
router.get('/search/:keyword', searchReataurant)
router.get('/all-reviews/:rid', allReviews)

module.exports = router
