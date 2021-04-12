# Stock Model for SQLAlchemy database design class
from init import db

stock_contract = db.Table('stock_contract',
    db.Column('Symbol', db.String(10), db.ForeignKey('matchedstock.Symbol')),
    db.Column('id', db.Integer, db.ForeignKey('contract.id'))
)

class Matchedstock(db.Model):
    __tablename__ = 'matchedstock'
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
