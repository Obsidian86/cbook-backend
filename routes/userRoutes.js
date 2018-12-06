const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");
const Account = require("../schema/accountsSchema");
const Transaction = require("../schema/transactionSchema"); 
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res, next) => { 
    try {   
        let findUser = await User.findOne({"username": req.body.username}); 
        if( !findUser ){
            next({ status: 400, message: "No user found" });
        }
        let testPassword = await bcrypt.compare(req.body.password, findUser.password);
        
        if(testPassword){
            res.status(200).json({userId: findUser._id});
        }else{
            next({ status: 400,  message: "Incorrect password" });
        }
        
    } catch (err) {
        next(err);
    }
});

router.delete("/", async (req, res, next) => {
    try {  
        let deletedUser = await User.findOneAndDelete({_id: req.body.UserId});
        let transactionList = [];
        let userAccounts = deletedUser.accounts;
        userAccounts.forEach( async(account) => {
            let delTrans = await Account.findOneAndDelete({_id: account._id});
            transactionList.push( delTrans.transactions );
        });
        transactionList.forEach(async(transactionSet) => {
           transactionSet.forEach(async(transaction) =>{
                await Transaction.findOneAndDelete({_id: transaction._id});
           });
        });
        res.status(200).json({synced: 100})
    } catch (err) {
        next(err);
    }
});

router.post("/newuser", async (req, res, next) => {
    try { 
        let {username, password } = req.body;
        let hashedPass = await bcrypt.hash(password, 10);
        let userInfo = { 
            username, 
            password: hashedPass,
            synced: Date.now(),
            accounts: []
         };
        let newUser = await User.create(userInfo);
        res.status(200).json({synced: 200, userAccount: newUser});
    } catch (err) { 
        next(err);
    }
    
});

module.exports = router;