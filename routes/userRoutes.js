const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema"); 
const bcrypt = require("bcryptjs");

router.post("/createuser", async (req, res, next) => {
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