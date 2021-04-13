# import pandas as pd 
# from CandidateDB import Candidate, Contribution
# from StockDB import Matchedstock
# from ContractDB import Contract
# from init import db

# db.create_all()
# # Exported database tables into csvs, df_states is just csv of states and their codes
# df_states = pd.read_csv(r'./states.csv')
# df_cands = pd.read_csv(r'./candidateTable.csv', sep=';')
# df_contribs = pd.read_csv(r'./contributionTable.csv', sep=';')
# df_stocks = pd.read_csv(r'./matchedstockTable.csv', sep=';')
# df_contracts = pd.read_csv(r'./contractTable.csv', sep='|')

# for i in range(len(df_stocks)):
#     df = df_stocks.iloc[i]
    
#     fullState = df['State']
#     state = df_states[df_states['State']==fullState]
#     if not state.empty:
#         fullState = state['Code'].iloc[0]

#     matchedstock = Matchedstock(Symbol=df['Symbol'], Full_Name=df['Full_Name'], Last_Sale=df['Last_Sale'], Net_Change=df['Net_Change'],
#     Percentage_Change=df['Percentage_Change'], Market_Cap=df['Market_Cap'], Country=df['Country'], IPO_Year=df['IPO_Year'], Volume=df['Volume'],
#     Sector=df['Sector'], Industry=df['Industry'], Orgname=df['Orgname'], State=fullState)
    
#     db.session.add(matchedstock)

# db.session.commit()


# for i in range(len(df_contracts)):
#     df = df_contracts.iloc[i]

#     contract = Contract(id = df['id'], contract_award_id = df['contract_award_id'], contract_parentagency = df['contract_parentagency'], contract_currentval = df['contract_currentval'],
#     contract_recipient = df['contract_recipient'], contract_naics = int(df['contract_naics']), contract_sop = df['contract_sop'], contract_recipient_district = df['contract_recipient_district'],
#     contract_date = df['contract_date'], contract_recipient_address = df['contract_recipient_address'], contract_stateflag = df['contract_stateflag'], contract_agencylogo = df['contract_agencylogo'],
#     contract_naics_description = df['contract_naics_description'],contract_award_description = df['contract_award_description'] )
    
#     db.session.add(contract)

#     db.session.commit()

# db.session.commit()


# for i in range(len(df_contracts)):
#     df = df_contracts.iloc[i]
#     contract = Contract.query.filter_by(id=df['id']).first()

#     stocks = Matchedstock.query.filter_by(State=df['contract_sop']).all()
#     for stock in stocks:
#         contract.stocks_in_state.append(stock)

# db.session.commit()




# for i in range(len(df_cands)):
#     df = df_cands.iloc[i]

#     cand_office = 'House'
#     if df['cand_office'] == 's':
#         cand_office = 'Senate'

#     cand_party = 'Republican'
#     if df['cand_party'] == 'D':
#         cand_party = 'Democrat'
#     if df['cand_party'] == 'I':
#         cand_party = 'Independent'
#     if df['cand_party'] == 'L':
#         cand_party = 'Libertarian'

#     cand_contribs = df_contribs[df_contribs['candidate_cand_crp_id'] == df['cand_crp_id']]
#     total = cand_contribs['total'].sum()

#     candidate = Candidate(cand_crp_id=df['cand_crp_id'], cand_firstname=df['cand_firstname'], cand_lastname=df['cand_lastname'], cand_party=cand_party, cand_office=cand_office, cand_state=df['cand_state'], cycle=df['cycle'], cand_image=df['cand_image'], total_received=total)

#     db.session.add(candidate)

# db.session.commit()


# for i in range(len(df_contribs)):
#     df = df_contribs.iloc[i]

#     contribution = Contribution(candidate_cand_crp_id=df['candidate_cand_crp_id'], contrib_id=df['contrib_id'], org_name=df['org_name'], total=df['total'], pacs=df['pacs'], indivs=df['indivs'])

#     db.session.add(contribution)

# db.session.commit()

# for i in range(len(df_cands)):
#     df = df_cands.iloc[i]
#     cand = Candidate.query.filter_by(cand_crp_id=df['cand_crp_id']).first()

#     stocks = Matchedstock.query.filter_by(State=df['cand_state']).all()
#     for stock in stocks:
#         cand.stocks_in_state.append(stock)

# db.session.commit()


# for i in range(len(df_cands)):
#     df = df_cands.iloc[i]
#     cand = Candidate.query.filter_by(cand_crp_id=df['cand_crp_id']).first()

#     contracts = Contract.query.filter_by(contract_sop=df['cand_state']).all()
#     for contract in contracts:
#         cand.contracts_in_state.append(contract)

# db.session.commit()



