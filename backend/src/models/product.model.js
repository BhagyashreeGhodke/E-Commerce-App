import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    url: { type: String, required: true },
    detailUrl: { type: String, required: true },
    title: {
        type: new mongoose.Schema({
            shortTitle: { type: String, required: true },
            longTitle: { type: String, required: true }
        }),
        required: true
    },
    price: {
        type: new mongoose.Schema({
            mrp: { type: Number, required: true },
            cost: { type: Number, required: true },
            discount: { type: String, required: true }
        }),
        required: true
    },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: String, required: true },
    tagline: { type: String, required: true },
    gender: { type: String, required: true },
    sizes: { type: [String], required: true }, // Array of sizes
    category: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    priceRange: { type: String, required: true },
    discountRange: { type: String, required: true }
});

// Create the model
const Product = mongoose.model('Product', productSchema);

export default Product;
