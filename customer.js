const express = require("express");
const app = express();
const pool = require("./db").pool;
const fs = require("fs");
const path = require("path");
const session = require('express-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const port = process.env.PORT || 5500

app.use(express.static(path.join('public/css')));
app.use(express.static(path.join('public/js')));
app.use(express.json());// req.body

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//  HOME PAGE//
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// CUSTOMER DETAILS\\
app.get("/customer", async (req, res) => {
    try {
        const allname = await pool.query("SELECT * FROM customer1 ORDER BY id ASC");
        const data = allname.rows;
        fs.writeFile('./public/js/customer.json', JSON.stringify(data, null, 2), err => {
            if (err) {
                console.log(err.message);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
    res.sendFile(path.join(__dirname + '/customer.html'));
});

// TRANSFER PAGE//
app.get('/transfer', function (req, res) {
    res.sendFile(path.join(__dirname + '/transfer.html'));
});


// POST TO DB//
app.post('/transfer_money', urlencodedParser, (req, res) => {
    // Prepare output in JSON format 
    var sender_acc = parseInt(req.body.Sender_Account);
    var reciever_acc = parseInt(req.body.Reciever_Account);
    var amount = parseInt(req.body.Amount);
    fs.readFile('./public/js/customer.json', (err, data) => {
        if (err) {
            console.log(err.message);
        }
        else {
            JSON.parse(data).forEach(item => {
                if (item.account_no == sender_acc && item.account_balance >= amount) {
                    pool.query("UPDATE customer1 SET account_balance = account_balance - $1 WHERE account_no = $2", [amount, sender_acc]);
                    pool.query("UPDATE customer1 SET account_balance = account_balance + $1 WHERE account_no = $2", [amount, reciever_acc]);
                }
            });
        }
    });

    res.redirect('/transfer');
});

app.listen(port, () => {
    console.log("server is listening on port 5500");
});