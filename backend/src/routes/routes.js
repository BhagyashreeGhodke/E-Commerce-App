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

import { getProducts, getProductById } from "../controllers/product.controller.js";

const router = Router()

router.route("/register").post(
    // upload.single('avatar'),
    upload.fields([{name: "avatar",
maxCount: 1}]),
    registerUser
    )

router.route("/login").post(loginUser)

// product routes

router.route('/products').get(getProducts);

router.route('/product/:id').get(getProductById);


//secured routes

router.route("/logout").post( verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/all-users").get(verifyJWT, getAllUsers)




export default router