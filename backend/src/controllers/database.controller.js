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
            const products = [];
            for (const row of batch) {
                const fields = row.split(',');
                if (fields.length !== 19) {
                    console.log(`Skipping row ${row}, incorrect number of fields`);
                    continue; // Skip rows with incorrect number of fields
                }

                const [
                    url, detailUrl, shortTitle, longTitle,
                    mrp, cost, priceDiscount, quantity,
                    description, discount, tagline,
                    gender = 'women', sizes, category, color,
                    brand, priceRange, discountRange
                ] = fields;

                // Check if any required fields are empty
                if (
                    !url || !detailUrl || !shortTitle || !longTitle ||
                    !mrp || !cost || !priceDiscount || !quantity ||
                    !description || !discount || !tagline ||
                    !gender || !sizes || !category || !color ||
                    !brand || !priceRange || !discountRange
                ) {
                    console.log(`Skipping row ${row}, missing required field`);
                    continue; // Skip rows with missing required fields
                }

                const product = {
                    url, detailUrl, shortTitle, longTitle,
                    price: { mrp: parseFloat(mrp) || 0, cost: parseFloat(cost), discount: priceDiscount || 0},
                    quantity: parseInt(quantity),
                    title: { shortTitle, longTitle },
                    description, discount, tagline,
                    gender, sizes, category, color, brand,
                    priceRange, discountRange
                };

                products.push(product);
            }

            if (products.length > 0) {
                await Product.insertMany(products);
            }

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
