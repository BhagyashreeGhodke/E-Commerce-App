import express from "express"

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/api/products', async (req, res) => {
    try {
        // Fetch demo product data from Flipkart, Myntra, and Amazon
        
        const flipkartResponse = await axios.get('https://www.flipkart.com/medellin-38-matt-acoustic-guitar-linden-wood-rosewood-right-hand-orientation/p/itmb8013422bd229?pid=ACGGTSC4DUC8GJBY&lid=LSTACGGTSC4DUC8GJBYZEJ4UF&marketplace=FLIPKART&store=ypu%2Fujd%2F7wz&spotlightTagId=BestsellerId_ypu%2Fujd%2F7wz&srno=b_1_4&otracker=browse&fm=organic&iid=371ae05b-9af5-4233-9fae-e8e91fd0bf2c.ACGGTSC4DUC8GJBY.SEARCH&ppt=browse&ppn=browse&ssid=t9k094mmgw0000001715699866532');

        const myntraResponse = await axios.get('https://api.example.com/myntra/products');
        const amazonResponse = await axios.get('https://api.example.com/amazon/products');

        const flipkartProducts = flipkartResponse.data.products;
        const myntraProducts = myntraResponse.data.products;
        const amazonProducts = amazonResponse.data.products;

        // Combine and send the products as a response
        const products = [...flipkartProducts, ...myntraProducts, ...amazonProducts];
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
