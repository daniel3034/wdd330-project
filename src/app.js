const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, 'src/public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
module.exports = app;
