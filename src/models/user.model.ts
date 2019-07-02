const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }
);

export default mongoose.model("User", UserSchema);