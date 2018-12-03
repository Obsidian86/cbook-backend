const mongoose = require("mongoose"); 

const transactionSchema = new mongoose.Schema({
    payee: String,
    amount: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    cleared: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);