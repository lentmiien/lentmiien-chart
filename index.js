//const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }));
