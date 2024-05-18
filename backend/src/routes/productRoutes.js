//Backend/src/routes/user.routes.js
import { Router } from "express";
import {
    getAllUsers,
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
  
} 
from "../controllers/user.controller.js";
import { upload }  from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { 
    getProducts,
    getProductById,
    deleteAllProducts,
    countAllProducts, 
    printFields,
    getCachedResults,
    getSuggestions
     } from "../controllers/product.controller.js";

const productRouter = Router()

// Route for fetching suggestions
productRouter.route("/suggestions").get(getSuggestions);

// Route for fetching cached results
productRouter.route("/cached-results").get(getCachedResults);

// product routes

productRouter.route('/products').get(getProducts);

productRouter.route('/products/:id').get(getProductById);



// debugging routes

productRouter.route('/count').get(countAllProducts);

productRouter.route('/print-fields').get(printFields);

// delete all products from database

productRouter.route('/delete-all').delete(deleteAllProducts);


export default productRouter