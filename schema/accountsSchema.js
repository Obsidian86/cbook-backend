const mongoose = require("mongoose");  

const accountsSchema = new mongoose.Schema({
    name: String,
    balance: {
        type: String,
        require: true
    },
    desc: String,
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]  
});

module.exports = mongoose.model("Account", accountsSchema);