import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import redis from 'redis';

// Create Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Cached results stored in memory
let cachedResults = {};

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products || products.length === 0) {
        throw new ApiError(404, "No products found");
    }

    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        throw new ApiError(400, "No ID found");
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "No product found");
    }

    res.json(product);
});

const deleteAllProducts = asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    console.log('All entries deleted successfully');
    res.status(200).json({ message: 'All entries deleted successfully' });
});

const countAllProducts = asyncHandler(async (req, res) => {
    const count = await Product.countDocuments();
    console.log('Number of documents:', count);
    res.status(200).json({ message: 'All entries counted successfully', count });
});

const printFields = asyncHandler(async (req, res) => {
    const { fieldName } = req.body;

    if (!fieldName) {
        throw new ApiError(400, "Field name is required");
    }

    console.log("fieldname: ", fieldName);
    const products = await Product.find({}, { [fieldName]: 1, _id: 0 });
    const result = products.map(product => ({ [fieldName]: product[fieldName] }));
    res.json(result);
});

const getSuggestions = asyncHandler(async (req, res, next) => {
    const { query } = req.query;

    if (!query) {
        return next(new ApiError(400, "Query parameter is required"));
    }

    console.log("Query received:", query);

    try {
        // Query the database for suggestions based on the user input
        const regexQuery = new RegExp(query, 'i'); // Create a RegExp object for case-insensitive search
        console.log("regexquery: ", regexQuery);
        const suggestions = await Product.find({ 'title.shortTitle': { $regex: regexQuery } })
            .distinct('title');

        // console.log("suggestions: ", suggestions);

        console.log("Suggestions found:", suggestions);

        if (suggestions.length === 0) {
            console.log('No suggestions found for query:', query);
        }

        // Update cached results with the new suggestions
        cachedResults[query] = suggestions;

        console.log("cashedResults: ", cachedResults);
        // Return suggestions to the client
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

const getCachedResults = asyncHandler(async (req, res) => {
    try {
        console.log("cashedResults: ", cachedResults);

        // Check if there are cached results
        if (Object.keys(cachedResults).length === 0) {
            throw new ApiError(404, "No cached results found");
        }

        // Return cached results to the client
        res.status(200).json(cachedResults);
    } catch (error) {
        console.error('Error fetching cached results:', error);

        // Handle different types of errors
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export {
    getProducts,
    getProductById,
    deleteAllProducts,
    countAllProducts,
    printFields,
    getSuggestions,
    getCachedResults
};
