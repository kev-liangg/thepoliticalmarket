# SQLAlchemy database design class
import json
from flask_cors import CORS
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager 
import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# can test on sqlite database first
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'mydb.sqlite')

# switch to our mysql database when ready: (uncomment following line, comment out previous)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://tpm:tpmpassword@aaj6jr738ea46y.cjnldv06yt97.us-east-2.rds.amazonaws.com:3306/ebdb'

# don't set configs like this, do it like above
# app.config['MYSQL_USER'] = 'tpm'
# app.config['MYSQL_DATABASE'] = 'ebdb'
# app.config['MYSQL_PASSWORD'] = 'tpmpassword'
# app.config['MYSQL_HOST'] = 'aaj6jr738ea46y.cjnldv06yt97.us-east-2.rds.amazonaws.com'
# app.config['MYSQL_PORT'] = '3306'

# prevents a random warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)
#Todo replace with relevant info
class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    # contract_award_unique = db.Column(db.String(75))
    contract_award_id = db.Column(db.String(30))
    contract_naics_description = db.Column(db.String(100))
    contract_award_description = db.Column(db.String(200))
    contract_parentagency = db.Column(db.String(50), nullable=False)
    contract_currentval = db.Column(db.Float, nullable=False)
    contract_recipient = db.Column(db.String(50), nullable=False)
    contract_naics = db.Column(db.Integer, nullable=False)
    contract_sop = db.Column(db.String(14), nullable=False)
    contract_date = db.Column(db.String(11), nullable=False)
    contract_stateflag = db.Column(db.String(200), nullable = True)
    contract_agencylogo = db.Column(db.String(200), nullable = False)
    contract_recipient_address = db.Column(db.String(50), nullable = False)
    contract_recipient_district = db.Column(db.Integer, nullable=False)




# flask_restless automatically creates endpoints for the db.Model classes at /api/[class_name]:
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Contract,results_per_page = 200)



if __name__ == '__main__':
    app.run(port=8081, debug=True)




