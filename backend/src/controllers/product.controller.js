import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});

        if(!products) {
            throw new ApiError(404, "no productfound");
        }

        res.json(products);
        
    }catch (error) {
        console.error("error: ", error)
    }
}
)

const getProductById = asyncHandler(async (req, res) => {
    try {
        if (!req.params.id) {
            throw new ApiError(404, "no id found");
        }
        const products = await Product.findOne({ '_id': request.params.id });

        if (!products) {
            throw new ApiError(404, "no product found");
        }

        res.json(products);
        
    }catch (error) {
        console.error("error: ", error)
    }
}
)

export {
    getProducts,
    getProductById
}