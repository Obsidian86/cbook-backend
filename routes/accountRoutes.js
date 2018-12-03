const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");
const Accounts = require("../schema/accountsSchema");
const Transactions = require("../schema/transactionSchema");

router.get("/:user", async (req, res, next)=>{ 
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
        console.log(err);
    } 
});

router.post("/:user", async (req, res, next)=>{
    try {
        let createdAccount = await Accounts.create(req.body)
        let user = await User.findById(req.params.user);
        user.accounts.push(createdAccount._id); 
        user.synced = Date.now();
        await user.save();
        res.status(200).json({synced: user.synced, account: createdAccount});
    } catch (err) {
        console.log(err);
    }
});


router.delete("/:user", async (req, res, next)=>{
    try { 
        await Accounts.findOneAndDelete({_id: req.body.account});
        let user = await User.findById(req.params.user);
        await user.accounts.splice(user.accounts.indexOf(req.body.account), 1);
        user.synced = Date.now();
        await user.save();
        res.status(200).json({synced: user.synced});
    } catch (err) {
        console.log(err);
    }
});

 
module.exports = router;

