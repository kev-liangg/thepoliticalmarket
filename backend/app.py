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

manager = APIManager(app, flask_sqlalchemy_db=db)


######## CANDIDATE MODEL ########
cand_stock = db.Table('cand_stock',
    db.Column('cand_crp_id', db.String(9), db.ForeignKey('candidate.cand_crp_id')),
    db.Column('Symbol', db.String(10), db.ForeignKey('matchedstock.Symbol'))
)

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

    stocks_in_state = db.relationship('Matchedstock', secondary=cand_stock, backref=db.backref('cands_in_state', lazy='dynamic'))

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

manager.create_api(Candidate, results_per_page=16)
manager.create_api(Contribution)



######## CONTRACT MODEL ########
contract_cand = db.Table('contract_cand',
    db.Column('id', db.Integer, db.ForeignKey('contract.id')),
    db.Column('cand_crp_id', db.String(9), db.ForeignKey('candidate.cand_crp_id'))
)

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

    cands_in_state = db.relationship('Candidate', secondary=contract_cand, backref=db.backref('contracts_in_state', lazy='dynamic'))

manager.create_api(Contract,results_per_page = 200)




######## STOCK MODEL ########
stock_contract = db.Table('stock_contract',
    db.Column('Symbol', db.String(10), db.ForeignKey('matchedstock.Symbol')),
    db.Column('id', db.Integer, db.ForeignKey('contract.id'))
)

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

    contracts_in_state = db.relationship('Contract', secondary=stock_contract, backref=db.backref('stocks_in_state', lazy='dynamic'))

manager.create_api(Matchedstock,results_per_page = 50)



if __name__ == '__main__':
    app.run(port=8081, debug=True)