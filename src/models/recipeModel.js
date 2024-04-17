const { boolean, number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    instructions: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    category:{
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner']
    },
    image:{
        type: String
    },
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('recipe', recipeSchema);