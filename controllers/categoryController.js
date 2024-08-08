const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            return res.status(401).send({ message: "Location is required" });
        }

        const existingCategory = await categoryModel.findOne({ location })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "category already exists",
            })
        }

        const category = await categoryModel({ location, slug: slugify(location) }).save();
        res.status(200).send({
            success: true,
            message: "New location/category craeted",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in create category"
        })

    }

}

const updateCategoryController = async (req, res) => {
    try {
        const { location } = req.body;
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { location, slug: slugify(location) }, { new: true });
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })

    }
}

const getAllCategories = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "all categories list",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })

    }
}
const singleCategory = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "single category found",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })

    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "deleted successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })

    }
}

module.exports = {
    createCategoryController,
    updateCategoryController,
    getAllCategories,
    singleCategory,
    deleteCategory
};

