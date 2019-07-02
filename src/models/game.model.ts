const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }
)

export default mongoose.model("Game", GameSchema);