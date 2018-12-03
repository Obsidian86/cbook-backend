const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const errorHandler = require("./handlers/errorHandler");

let app = express();
const port = process.env.PORT || 3089;

mongoose.connect("mongodb://localhost:27017/cbook", { useNewUrlParser: true }, (err)=>{
    console.log(err || "connected to db"); 
});

app.use(cors({origin: 'http://localhost:3000'})); 
app.use(bodyParser.json());
 
app.use("/user", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

app.use("/", (req, res, next) =>{ 
    next({message: "Page not found.", status: 404});
});

app.use("/", errorHandler);

app.listen(port, ()=>{
    console.log("server running on port: " + port);
});