const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    synced: {
        type: String,
        required: true
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }]
});

module.exports = mongoose.model("User", userSchema);