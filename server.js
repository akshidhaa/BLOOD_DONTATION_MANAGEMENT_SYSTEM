const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ SINGLE CLEAN INSERT FUNCTION
function insertRecord(table, data, res, redirectPage) {

    let sql = "";
    let values = [];

    if (table === "patient" || table === "donor") {
        sql = `INSERT INTO ${table} (name, contact_no, blood_group) VALUES (?, ?, ?)`;
        values = [data.name, data.contact_no, data.blood_group];
    }

    else if (table === "employee") {
        sql = `INSERT INTO employee (name, contact_no, designation) VALUES (?, ?, ?)`;
        values = [data.name, data.contact_no, data.designation];
    }

    else if (table === "blood_bank") {
        sql = `INSERT INTO blood_bank (bank_name, location) VALUES (?, ?)`;
        values = [data.bank_name, data.location];
    }

    else if (table === "blood") {
        sql = `INSERT INTO blood (blood_quantity) VALUES (?)`;
        values = [data.blood_quantity];
    }

    else if (table === "blood_request") {
        sql = `INSERT INTO blood_request (blood_group) VALUES (?)`;
        values = [data.blood_group];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log("❌ ERROR:", err);
            res.send(`<script>alert("ERROR: ${err.sqlMessage}"); window.location.href='${redirectPage}'</script>`);
        } else {
            res.send(`<script>alert("Record added successfully"); window.location.href='${redirectPage}'</script>`);
        }
    });
}

// ROUTES
app.post('/add_patient', (req, res) => {
    insertRecord('patient', {
        name: req.body.Name,
        contact_no: req.body.Contact,
        blood_group: req.body.BloodGroup
    }, res, 'patient.html');
});

app.post('/add_donor', (req, res) => {
    insertRecord('donor', {
        name: req.body.Name,
        contact_no: req.body.Contact,
        blood_group: req.body.BloodGroup
    }, res, 'donor.html');
});

app.post('/add_employee', (req, res) => {
    insertRecord('employee', {
        name: req.body.Name,
        contact_no: req.body.Contact,
        designation: req.body.Role
    }, res, 'employee.html');
});

app.post('/add_bloodbank', (req, res) => {
    insertRecord('blood_bank', {
        bank_name: req.body.BankName,
        location: req.body.Location
    }, res, 'bloodbank.html');
});

app.post('/add_blood', (req, res) => {
    insertRecord('blood', {
        blood_quantity: req.body.Quantity
    }, res, 'blood.html');
});

app.post('/add_request', (req, res) => {
    insertRecord('blood_request', {
        blood_group: req.body.BloodGroup
    }, res, 'bloodrequest.html');
});

// START SERVER
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});