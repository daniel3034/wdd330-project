const express = require('express');
const app = express();

app.use(express.static('src/public'));
module.exports = app;
