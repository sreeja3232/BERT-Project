const { default: slugify } = require("slugify");
const ReviewsModel = require("../models/reviewModel");
const RatingsModel = require("../models/RatingsModel");
const fs = require('fs');

const createRestaurant = async (req, res) => {
    try {
        const { restName, slug, description, location } = req.fields
        const { photo } = req.files

        switch (true) {
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and should be leass than 1mb' })
        }

        const restaurants = await RatingsModel({ ...req.fields, slug: slugify(restName) });

        if (photo) {
            restaurants.photo.data = fs.readFileSync(photo.path);
            restaurants.photo.contentType = photo.type;
        }
        await restaurants.save();
        res.status(201).send({
            success: true,
            message: "Restaurant created succesfully",
            restaurants
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in create restaurant"
        })
    }

}
const updateRestaurant = async (req, res) => {
    try {
        const { restName, slug, description, location } = req.fields
        const { photo } = req.files
        switch (true) {
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and should be leass than 1mb' })
        }
        const restaurants = await RatingsModel.findByIdAndUpdate(req.params.rid, { ...req.fields, slug: slugify(restName) }, { new: true });
        if (photo) {
            restaurants.photo.data = fs.readFileSync(photo.path);
            restaurants.photo.contentType = photo.type;
        }
        await restaurants.save();
        res.status(201).send({
            success: true,
            message: "Restaurant updated succesfully",
            restaurants
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in update restaurant"
        })
    }

}
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await RatingsModel.find({}).populate("location").select("-photo").limit(12).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "All restaurants",
            totalRestaurants: restaurants.length,
            restaurants,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in get restaurants"
        })
    }

}
const getSingleRestaurant = async (req, res) => {
    try {
        const restaurants = await RatingsModel.findOne({ slug: req.params.slug }).select("-photo").populate("location");

        res.status(200).send({
            success: true,
            message: "Restaurant fetched",
            totalRestaurants: restaurants.length,
            restaurants,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in get single restaurant"
        })
    }

}
const getrestaurantPhoto = async (req, res) => {
    try {
        const restaurant = await RatingsModel.findOne({ slug: req.params.slug });
        if (restaurant.photo.data) {
            res.set("Content-type", restaurant.photo.contentType)
            return res.status(200).send(restaurant.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in get photo of restaurant"
        })
    }

}
const deleteRestaurant = async (req, res) => {
    try {
        await RatingsModel.findByIdAndDelete(req.params.rid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting estaurant"
        })
    }

}
const searchReataurant = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await RatingsModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        }).select('-photo');
        res.json(results);



    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in seach api",
            error
        })
    }

}
const allReviews = async (req, res) => {
    const restId = req.params.rid;
    console.log(restId);

    try {
        // Find all reviews with the given restid
        const reviews = await ReviewsModel.find({ restid: restId }).sort({ createdAt: -1 }).limit(7);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    createRestaurant, getRestaurants, getSingleRestaurant, getrestaurantPhoto, deleteRestaurant, updateRestaurant, searchReataurant, allReviews
};