const express = require("express");
let cors = require('cors');
let app = express();
const port = process.env.PORT || 3089;

const accountRoutes = require("./routes/accountRoutes");

app.use(cors({origin: 'http://localhost:3000'}));
 
app.use("/accounts", accountRoutes);

app.listen(port, ()=>{
    console.log("server running on port: " + port);
});