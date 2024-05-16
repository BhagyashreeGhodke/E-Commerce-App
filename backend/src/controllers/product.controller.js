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
    tagline: { type: String, required: true }
});

// Create the model
const Product = mongoose.model('Product', productSchema);

export default Product;
