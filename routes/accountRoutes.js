const express = require("express");
const router = express.Router();

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

router.get("/getallaccounts", (req, res)=>{
    res.status(200).json(accountData);
});
router.delete("/deleteaccount", (req, res)=>{
    res.status(200).json(accountData);
});
router.post("/addaccount", (req, res)=>{
    res.status(200).json(accountData);
});
router.post("/addtransaction", (req, res)=>{
    res.status(200).json(accountData);
});
router.delete("/deletetransaction", (req, res)=>{
    res.status(200).json(accountData);
});
router.put("/updatetransaction", (req, res)=>{
    res.status(200).json(accountData);
});

module.exports = router;

