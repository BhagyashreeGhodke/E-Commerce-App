import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import { app } from "./app.js"
// import insertProducts from "./controllers/product.controller.js";

dotenv.config({
   
});

const port = process.env.PORT || 3000

// console.log("port: ", port);

//connecting database

connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("errrror:", error);
        throw error
    })
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})
.catch( (error) => {
    console.log("Mongo DB connection failed !!!", error);

})

// inserting products dataset into mongodb atlas
// 1000 products inserted successfully

// insertProducts()
// .then(() => {
//     app.on("error", (error) => {
//         console.log("errrror in db insert:", error);
//         throw error
//     })
// })
// .catch( (error) => {
//     console.log("Mongo DB insertion failed !!!", error);

// })

