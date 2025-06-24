const express = require('express');
const cors = require('cors');  // Import CORS package
const app = express();  

require("dotenv").config();
const PORT = process.env.PORT || 4000;  // Added `const` for PORT

// Enable CORS for all origins (or specify a list of allowed origins)
app.use(cors());  // Allow all origins for now, or use cors({ origin: 'http://localhost:3000' }) to allow only your frontend

// Middleware to parse JSON request bodies
app.use(express.json());

// Import routes for API
const Routes = require("./routes/routes");
app.use("/api/v1", Routes);  // Mount your routes here

// Connect the database
const dbConnect = require("./config/database");
dbConnect();

// Start the server (✅ Only once)
app.listen(PORT, () => {
    console.log(`Server Started!! at port ${PORT}`);
});
