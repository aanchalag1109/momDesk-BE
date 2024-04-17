const { Router } = require('express');
const { createRecipe, getAllRecipe } = require('./recipe');
const { registerUser, loginUser } = require('./users');
const auth = require('../middlewares/auth');
const app = Router();
const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/recipes/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // File naming strategy
    },
});
const upload = multer({ storage: storage });
app.post('/register-user', registerUser);
app.post('/login-user', loginUser);
app.post('/create-recipe', auth, upload.single('image'), createRecipe);
app.get('/get-all-recipes', auth, getAllRecipe);
module.exports = app;