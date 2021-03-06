const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../schema/userSchema");
const Accounts = require("../schema/accountsSchema");
const Transaction = require("../schema/transactionSchema");

router.get("/", async (req, res, next)=>{ 
    try { 
        let allAccounts = await User.findById(req.params.user);
        allAccounts = allAccounts ? await allAccounts.populate({
                path: "accounts", 
                model: "Account", 
                populate: { 
                    path: "transactions", 
                    model: "Transaction"
                }
            }).execPopulate() 
        : { synced: 0, accounts: {}};
        res.status(200).json({accounts: allAccounts.accounts, synced: allAccounts.synced});
    } catch (err) {
        let error = new Error();
        error.message = "Problem getting accounts";
        next(error);
    } 
});

router.post("/", async (req, res, next)=>{
    try { 
        let createdAccount = await Accounts.create(req.body);
        let date = new Date(); 
        let createdTransaction = await Transaction.create({
            payee: "Initial amount",
            amount: req.body.balance,
            date: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
            cleared: "yes"
        });
        let user = await User.findById(req.params.user);
        createdAccount.transactions.push(createdTransaction._id);
        user.accounts.push(createdAccount._id); 
        user.synced = Date.now();
        await createdAccount.save();
        await user.save();
        res.status(200).json({synced: user.synced, account: createdAccount, tran: createdTransaction});
    } catch (err) {
        let error = new Error();
        error.message = "Problem creating account";
        next(error);
    }
});


router.delete("/", async (req, res, next)=>{
    try {  
        let deletedAccount = await Accounts.findOneAndDelete({_id: req.body.account});
        let user = await User.findById(req.params.user); 
        await user.accounts.splice(user.accounts.indexOf(req.body.account), 1);
        let transactionList = deletedAccount.transactions;
        transactionList.forEach(async(transaction) =>{
            await Transaction.findOneAndDelete({_id: transaction._id});
       });
        user.synced = Date.now();
        await user.save();
        res.status(200).json({synced: user.synced});
    } catch (err) {
        let error = new Error();
        error.message = "Problem deleting account";
        next(error);
    }
});

 
module.exports = router;

