from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 🔗 DATABASE CONNECTION
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",        # put your MySQL password if any
    database="blood_bank"
)

cursor = db.cursor()


# =========================
# 🩸 DONOR MODULE
# =========================

@app.route('/donor', methods=['POST'])
def add_donor():
    data = request.json

    sql = """
    INSERT INTO Donor 
    (donor_no, name, dob, gender, address, city, pin, state, contact, email, blood_group, last_donated)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data['donor_no'], data['name'], data['dob'], data['gender'],
        data['address'], data['city'], data['pin'], data['state'],
        data['contact'], data['email'], data['blood_group'], data['last_donated']
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Donor added successfully"})


# GET ALL DONORS
@app.route('/donors', methods=['GET'])
def get_donors():
    cursor.execute("SELECT * FROM Donor")
    result = cursor.fetchall()
    return jsonify(result)


# SEARCH DONOR BY ID
@app.route('/donor/<int:donor_no>', methods=['GET'])
def search_donor(donor_no):
    cursor.execute("SELECT * FROM Donor WHERE donor_no=%s", (donor_no,))
    result = cursor.fetchone()
    return jsonify(result)


# =========================
# 🧑 PATIENT MODULE
# =========================

@app.route('/patient', methods=['POST'])
def add_patient():
    data = request.json

    sql = """
    INSERT INTO Patient 
    (patient_no, date, name, dob, address, city, contact, pin, blood_group)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data['patient_no'], data['date'], data['name'], data['dob'],
        data['address'], data['city'], data['contact'], data['pin'],
        data['blood_group']
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Patient added successfully"})


# =========================
# 🩸 BLOOD ISSUE MODULE
# =========================

@app.route('/issue', methods=['POST'])
def issue_blood():
    data = request.json

    sql = """
    INSERT INTO Blood_Issue 
    (issue_id, date, patient_no, blood_group, units)
    VALUES (%s,%s,%s,%s,%s)
    """

    values = (
        data['issue_id'], data['date'], data['patient_no'],
        data['blood_group'], data['units']
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Blood issued successfully"})


# =========================
# 🚀 START SERVER
# =========================

if __name__ == '__main__':
    app.run(debug=True)
