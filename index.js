const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes");
//const transactionRoutes = require("./routes/transactionRoutes");

let app = express();
const port = process.env.PORT || 3089;

mongoose.connect("mongodb://localhost:27017/cbook", { useNewUrlParser: true }, (err)=>{
    console.log(err || "connected to db"); 
});

app.use(cors({origin: 'http://localhost:3000'})); 
app.use(bodyParser.json());
 


app.use("/user", userRoutes);
app.use("/accounts", accountRoutes);
//app.use("/transactions", transactionsRoutes);
 

app.listen(port, ()=>{
    console.log("server running on port: " + port);
});