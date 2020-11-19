const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require('dotenv').config(); 

const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const auth = require("./handlers/auth");
const errorHandler = require("./handlers/errorHandler");

let app = express();
const port = process.env.PORT || 3089;
// db_user-88721
// 6RgwuhO6RrymHJXB

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wd7vr.mongodb.net/cbook?retryWrites=true&w=majority`, { useNewUrlParser: true }, (err)=>{
    console.log(err || "connected to db"); 
});

app.use(cors()); 
app.use(bodyParser.json());
 
app.use("/user", userRoutes);
app.use("/accounts/:user", auth, accountRoutes);
app.use("/transactions/:user", auth, transactionRoutes);

app.use("/", (req, res, next) =>{
    let error = new Error();
    error.message = "Page not found.";
    error.status = 404;
    next(error);
});

app.use("/", errorHandler);

app.listen(port, ()=>{
    console.log("server running on port: " + port);
});
