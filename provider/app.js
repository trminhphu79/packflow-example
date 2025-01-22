const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Request parsing middleware
app.use(express.json());

// Debug middleware - log all requests
app.use((req, res, next) => {
    console.log('----------------------------------------');
    console.log('Request Method:', req.method);
    console.log('Request Path:', req.path);
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('----------------------------------------');
    next();
});

// Routes
const productRoutes = require('./product/product.routes');
app.use('/', productRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send({
        message: 'Internal Server Error',
        error: err.message
    });
});

module.exports = app; 