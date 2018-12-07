const express = require("express");
const router = express.Router({mergeParams: true});
const Account = require("../schema/accountsSchema");
const Transaction = require("../schema/transactionSchema");

router.post("/", async(req, res, next)=>{
    try {
        let foundAccount = await Account.findById(req.body.account_id); 
        let createdTransaction = await Transaction.create( req.body.transaction );
        foundAccount.balance = parseInt(foundAccount.balance) + parseInt(createdTransaction.amount);
        await foundAccount.transactions.push(createdTransaction);
        await foundAccount.save();
        res.status(200).json({newTrans: createdTransaction, synced: Date.now()}); 
    } catch (err) {  
        let error = new Error(); 
        error.message = "Problem getting transactions";
        next(error);
    } 
});

router.delete("/", async (req, res, next)=>{
    try {
        let foundAccount = await Account.findById(req.body.accountId); 
        let findTransaction = await Transaction.findById(req.body.transId);  
        foundAccount.balance = parseFloat(foundAccount.balance) - parseFloat(findTransaction.amount);
        foundAccount.transactions = foundAccount.transactions.filter(acc => acc.toString() !== req.body.transId);
        await foundAccount.save();
        res.status(200).json({synced: Date.now()}); 
    } catch (err) {  
        let error = new Error(); 
        error.message = "Problem deleting transaction";
        next(error);
    } 
});
router.put("/", async (req, res, next)=>{
    try {
        let foundAccount = await Account.findById(req.body.account_id); 
        let findTransaction = await Transaction.findById(req.body.transaction_id); 
        foundAccount.balance = (parseFloat(foundAccount.balance) - parseFloat(findTransaction.amount)) + parseFloat(req.body.transaction.amount);
        findTransaction.payee = req.body.transaction.payee;
        findTransaction.amount = req.body.transaction.amount;
        findTransaction.cleared = req.body.transaction.cleared;
        findTransaction.date = req.body.transaction.date;
        await foundAccount.save();
        await findTransaction.save();
        res.status(200).json({synced: Date.now()});
    } catch (err) {
        let error = new Error(); 
        error.message = "Problem updating transaction";
        next(error);
    }

});

module.exports = router;