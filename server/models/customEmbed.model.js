const mongoose = require('mongoose');

const CustomEmbedSchema = new mongoose.Schema({
    command: {
        type: String,
        //required: [true, "Name required."],
        //minlength: [3, "Name must be at least 3 characters."]
        //unique: [true, "Name must be unquie."]
    },
    color: {
        type: String
    },
    title: {
        type: String,
        //maxlength: [256, "Title must be under 256 characters."]
    },
    description: {
        type: String,
        //maxlength: [2048, "Title must be under 2048 characters."]
    },
    image: {
        type: String
    },
    thumbnail: {
        type: String
    },
    url: {
        type: String
    }
}, {timestamps:true})

const customEmbed = mongoose.model("customEmbed",CustomEmbedSchema);

module.exports = customEmbed;