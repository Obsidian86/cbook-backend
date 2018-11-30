const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");
const Accounts = require("../schema/accountsSchema");

let accountData = {
    synced: 1543519362235,
    accounts:        [
        {
            id: 1,
            name: "Capital One",
            balance: 2000.213,
            desc: "Main checking account",
            transactions: [
                { payee: "x123", amount: 5001, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5002, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5003, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5004, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5005, date: "11/05/2018", cleared: "yes" }
            ]
        },
        {
            id: 21,
            name: "Ally Savings",
            balance: 6002.219,
            desc: "Savings Account",
            transactions:[
                { payee: "x123", amount: 5001, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5002, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5003, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5004, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5005, date: "11/05/2018", cleared: "yes" }
            ]
        },
        {
            id: 31,
            name: "Retirement",
            balance: 50000.219,
            desc: "Ally IRA accounts",
            transactions: [
                { payee: "x123", amount: 5001, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5002, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5003, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5004, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 5005, date: "11/05/2018", cleared: "yes" }
            ]
        },
        {
            id: 312,
            name: "Carmax Loan",
            balance: -21000,
            desc: "Carmax Auto loan",
            transactions: [
                { payee: "x123", amount: 286, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 286, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 286, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 286, date: "11/05/2018", cleared: "yes" },
                { payee: "x123", amount: 286, date: "11/05/2018", cleared: "yes" }
            ]
        }
    ]
};
  
router.get("/:user", async (req, res, next)=>{ 
    try {
        let allAccounts = await User.findById(req.params.user);
        allAccounts = await allAccounts.populate("accounts").execPopulate();
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

