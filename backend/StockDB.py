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

class Matchedstock(db.Model):
    Symbol = db.Column(db.String(10), nullable=False,primary_key=True)
    Full_Name = db.Column(db.String(100), nullable=False)
    Last_Sale = db.Column(db.Float, nullable=False)
    Net_Change = db.Column(db.Float, nullable=False)
    Percentage_Change = db.Column(db.String(10), nullable=False)
    Market_Cap = db.Column(db.Integer, nullable=False)
    Country = db.Column(db.String(30), nullable=False)
    IPO_Year = db.Column(db.Integer, nullable=False)
    Volume = db.Column(db.Integer, nullable=False)
    Sector = db.Column(db.String(10), nullable=False)
    Industry = db.Column(db.String(30), nullable=False)
    Orgname = db.Column(db.String(100), nullable=False)
    State = db.Column(db.String(30), nullable=False)

# flask_restless automatically creates endpoints for the db.Model classes at /api/[class_name]:
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Matchedstock,results_per_page = 50)


if __name__ == '__main__':
    app.run(port=8081, debug=True)
