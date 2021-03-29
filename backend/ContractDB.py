# Contract model for SQLAlchemy database design class
from init import db

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