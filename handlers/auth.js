const express = require('express');
const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.S_KEY, (err, decoded) =>{ 
            if( decoded && decoded.id === req.params.user){
                    return next();
            }else{
                let error = new Error();
                error.message = "Not logged in";
                return next(error);
            } 
        });
    } catch (err) {
        let error = new Error();
        error.message = "Not logged in";
        return next(error);
    } 
}

module.exports = auth;