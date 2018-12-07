const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../schema/userSchema");
const Account = require("../schema/accountsSchema");
const Transaction = require("../schema/transactionSchema"); 
const bcrypt = require("bcryptjs");
const auth = require("../handlers/auth");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
    try {   
        let findUser = await User.findOne({"username": req.body.username}); 
        if( !findUser ){
            let error = new Error();
            error.status = 400;
            error.message = "Incorrect password";
            next(error);
        }
        let testPassword = await bcrypt.compare(req.body.password, findUser.password);
        
        if(testPassword){
            let authToken = jwt.sign({id: findUser._id, username: findUser.username}, process.env.S_KEY);
            res.status(200).json({userId: findUser._id, authToken: authToken});
        }else{
            let error = new Error();
            error.status = 400;
            error.message = "Incorrect password";
            next(error);
        }
        
    } catch (err) {
        let error = new Error();
        error.message = "Problem loggin in";
        next(error);
    }
});

router.delete("/:user", auth, async (req, res, next) => {
    try {   
        let deletedUser = await User.findOneAndDelete({_id: req.params.user}); 
        let userAccounts = deletedUser.accounts;
        userAccounts.forEach( async(account) => {
            let delTrans = await Account.findOneAndDelete({_id: account._id});  
            delTrans.transactions.forEach(async(transaction) =>{
                await Transaction.findOneAndDelete({_id: transaction._id}); 
           });
        }); 
        res.status(200).json({synced: 1}) 
    } catch (err) {
        let error = new Error();
        error.message = "Problem deleting user";
        next(error);
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
        let authToken = jwt.sign({id: newUser._id, username: newUser.username}, process.env.S_KEY);
        res.status(200).json({synced: 200, userAccount: newUser, authToken: authToken});
    } catch (err) { 
        let error = new Error();
        error.message = "Problem creating user";
        next(error);
    }
    
});

module.exports = router;