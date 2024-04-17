
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectDB } = require("./src/db/dbConnection");
const cors = require('cors');
require('dotenv').config();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const apiRoutes = require('./src/controllers/routes');
app.use('/api', apiRoutes);
connectDB();
// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Hello from Express in Lambda!');
});
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});