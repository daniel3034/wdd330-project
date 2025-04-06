const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "src/public" directory
app.use(express.static(path.join(__dirname, 'src/public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});