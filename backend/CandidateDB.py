# SQLAlchemy database design class
import requests
import json
import pandas as pd

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

db = SQLAlchemy(app)

class Candidate(db.Model):
    cand_crp_id = db.Column(db.String(9), primary_key=True)
    cand_firstname = db.Column(db.String(50), nullable=False)
    cand_lastname = db.Column(db.String(50), nullable=False)
    cand_party = db.Column(db.String(1), nullable=False)
    cand_office = db.Column(db.String(1), nullable=False)
    cand_state = db.Column(db.String(2), nullable=False)
    cycle = db.Column(db.Integer, nullable=False)
    cand_image = db.Column(db.String(100), nullable=False, default='blank-profile3x2.png')
    contributions = db.relationship('Contribution', backref='recipient', lazy=True)

    def __repr__(self):
        return f"Candidate('{self.cand_crp_id}', '{self.cand_firstname}', '{self.cand_lastname}')"


class Contribution(db.Model):
    contrib_id = db.Column(db.String(150), primary_key=True)
    org_name = db.Column(db.String(100), nullable=False)
    total = db.Column(db.Float)
    pacs = db.Column(db.Float)
    indivs = db.Column(db.Float)
    candidate_cand_crp_id = db.Column(db.String(9), db.ForeignKey('candidate.cand_crp_id'), nullable=False)

    def __repr__(self):
        return f"Contribution('{self.org_name}', '{self.candidate_cand_crp_id}', {self.total})"






# flask_restless automatically creates endpoints for the db.Model classes at /api/[class_name]:
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Candidate)
manager.create_api(Contribution)



if __name__ == '__main__':
    app.run(port=8081, debug=True)




