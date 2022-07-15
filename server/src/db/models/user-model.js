const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
});

const UserModel = model("User", userSchema);
module.exports = UserModel;