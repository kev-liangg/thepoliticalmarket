# Candidate model for SQLAlchemy database design class
from init import db

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