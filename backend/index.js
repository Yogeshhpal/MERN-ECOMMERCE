const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const router = require('./routes');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: "https://mern-ecommerce-ki8v-6t7ivu0a7-yogeshs-projects-60f26ef9.vercel.app/",
    credentials: true
}));
app.use(express.json()); // This should come before routes
app.use(express.urlencoded({ extended: true })); // This should also come before routes
app.use(cookieParser());


// Routes
app.use("/api", router);

// Connect to Database and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database");
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});
