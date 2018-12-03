const express = require("express");
let router = express.Router();
const Account = require("../schema/accountsSchema");
const Transaction = require("../schema/transactionSchema");

router.post("/", async(req, res, next)=>{
    try {
        let foundAccount = await Account.findById(req.body.account_id); 
        let createdTransaction = await Transaction.create( req.body.transaction );
        await foundAccount.transactions.push(createdTransaction);
        foundAccount.save();
        res.status(200).json({synced: 200}); 
    } catch (err) {  
        next({message: err.message});
    }
    
   
});
router.delete("/deletetransaction", (req, res)=>{
    res.status(200).json(accountData);
});
router.put("/updatetransaction", (req, res)=>{
    res.status(200).json(accountData);
});

module.exports = router;