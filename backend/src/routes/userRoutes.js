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

const userRouter = Router()

//register

userRouter.route("/register").post(
    // upload.single('avatar'),
    upload.fields([{name: "avatar",
maxCount: 1}]),
    registerUser
    )

userRouter.route("/login").post(loginUser)

//secured routes

userRouter.route("/logout").post( verifyJWT, logoutUser)

userRouter.route("/refresh-token").post(refreshAccessToken)

userRouter.route("/current-user").get(verifyJWT, getCurrentUser)

userRouter.route("/all-users").get(verifyJWT, getAllUsers)

export default userRouter