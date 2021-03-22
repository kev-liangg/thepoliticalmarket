# Get all useful data from OpenSecrets -> transfer to database
from CandidateDB import db
from CandidateDB import Candidate, Contribution
# db.drop_all()
# db.create_all()

import requests
import json
import pandas as pd
#from crpapi import CRP

df_116th = pd.read_excel(r'./CRP_IDs_Reformatted.xlsx', sheet_name='Members 116th')
df_leghist = pd.read_csv(r'./legislators-historical.csv')
df_legcurr = pd.read_csv(r'./legislators-current.csv')

def get_name_in_116th( i ):
    crp_name = df_116th.iloc[i]['CRPName']
    name_list = crp_name.split(" ")
    
    last_name = name_list[0][0:len(name_list[0])-1]
    first_name = name_list[1]

    return first_name, last_name

def get_cand_atts( i ):
    cid = df_116th.iloc[i]['CID']
    
    first_name, last_name = get_name_in_116th(i)

    # df_legchosen_row = df_legcurr.loc[  (df_legcurr['last_name']==last_name) & (df_legcurr['first_name']==first_name)  ]
    df_legchosen_row = df_legcurr.loc[  df_legcurr['opensecrets_id']==cid ]
    if df_legchosen_row.empty:
        df_legchosen_row = df_leghist.loc[  (df_leghist['last_name']==last_name) & (df_leghist['first_name']==first_name)  ]

    
    party = df_legchosen_row.iloc[0]['party']

    office = df_legchosen_row.iloc[0]['type']

    state = df_legchosen_row.iloc[0]['state']

    cycle = 2020

    govtrack_id = df_legchosen_row.iloc[0]['govtrack_id']
    image = f"https://www.govtrack.us/static/legislator-photos/{govtrack_id}-200px.jpeg"  
    
    return cid, first_name, last_name, party, office, state, cycle, image

def get_contrib_atts(contrib):
    org_name = contrib['@attributes']['org_name']
    total = contrib['@attributes']['total']
    pacs = contrib['@attributes']['pacs']
    indivs = contrib['@attributes']['indivs']

    return org_name, total, pacs, indivs



# API_KEY = '05bb80c710037f9fb757974097bd9117'
# API_KEY = '6b558ead09c3df08fd18e79886fa5b2c'
API_KEY = '54f0c6b71d11afc304c00f3514a49f1b'
#crp = CRP(API_KEY)
output = 'json'
for i in []:

    cand_crp_id, cand_firstname, cand_lastname, cand_party, cand_office, cand_state, cycle, cand_image = get_cand_atts(i)
    candidate = Candidate(cand_crp_id=cand_crp_id, cand_firstname=cand_firstname, cand_lastname=cand_lastname, cand_party=cand_party, cand_office=cand_office, cand_state=cand_state, cycle=cycle, cand_image=cand_image)
    db.session.add(candidate)
    db.session.commit()

    url = f"https://www.opensecrets.org/api/?method=candContrib&cid={cand_crp_id}&cycle={cycle}&output={output}&apikey={API_KEY}"
    resp = requests.get(url).json()
    
    contribs = resp['response']['contributors']['contributor']
    if isinstance(contribs, list):
        for contrib in contribs:
            org_name, total, pacs, indivs = get_contrib_atts(contrib)
            contrib_id = org_name.replace(" ","%20") + "--" + cand_crp_id
            contribution = Contribution(contrib_id=contrib_id, org_name=org_name, total=total, pacs=pacs, indivs=indivs, candidate_cand_crp_id=cand_crp_id)
            db.session.add(contribution)
            db.session.commit()
    elif isinstance(contribs, dict):
        org_name, total, pacs, indivs = get_contrib_atts(contribs)
        contrib_id = org_name.replace(" ","%20") + "--" + cand_crp_id
        contribution = Contribution(contrib_id=contrib_id, org_name=org_name, total=total, pacs=pacs, indivs=indivs, candidate_cand_crp_id=cand_crp_id)
        db.session.add(contribution)
        db.session.commit()
    else:
        pass
    

    




# print(cands_df.loc[0, :]['CID']) to get row 0
# print(cands_df['CID'][0]) to get cid 0


