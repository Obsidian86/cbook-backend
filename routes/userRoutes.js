const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema"); 
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res, next) => {
    let workId = "5c01643ec393a44374a96f76";
    let homeId = "5c02cdace1c0fd2b68fab2ba";
    try { 
        res.status(200).json({userId: workId});
    } catch (err) {
        next(err);
    }
    
});

router.post("/", async (req, res, next) => {
    try {
        let userInfo = { username, password } = req.body;
        userInfo.password = await bcrypt.hash(userInfo.password, 10);
        let saveUser = await User.create(userInfo);
        res.status(200).json(saveUser);
    } catch (err) {
        next(err);
    }
    
});

module.exports = router;