const mongoose = require("mongoose");


const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Role"
            }
        ]
    })
)

module.exports = User;