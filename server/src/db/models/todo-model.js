const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    // userID: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    // },
    title: {
        type: String,
        trim: true,
        // unique: true,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const TodoModel = model("Todo", todoSchema);
module.exports = TodoModel;