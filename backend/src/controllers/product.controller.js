import mongoose from 'mongoose';
import fs from 'fs';
import Product from '../models/product.model.js'; // Adjust the path as necessary

async function insertProducts() {
    try {
        // Read the CSV file
        const csvData = fs.readFileSync('products.csv', 'utf-8');

        // Parse the CSV data
        const rows = csvData.split('\n').slice(1); // Skip header row

        // Convert CSV rows to product objects
        const batchSize = 100; // Adjust batch size as needed
        for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            const products = batch.map(row => {
                const [url, detailUrl, shortTitle, longTitle, mrp, cost, priceDiscount, quantity, description, discount, tagline] = row.split(',');
                return {
                    url, detailUrl, shortTitle, longTitle,
                    price: { mrp: parseFloat(mrp) || 0, cost: parseFloat(cost), discount: priceDiscount || 0},
                    quantity: parseInt(quantity),
                    title: { shortTitle, longTitle }, // Assuming title is an object with shortTitle and longTitle
                    description, discount, tagline
                };
            });
            await Product.insertMany(products);
            console.log(`Inserted batch ${i / batchSize + 1}`);
        }
        console.log('Products inserted successfully');
    } catch (error) {
        console.error('Error inserting products:', error);
    } finally {
        mongoose.disconnect();
    }
}

export default insertProducts;
