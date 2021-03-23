import pandas as pd
from ContractDB import db, Contract
df = pd.read_csv(r'./All_Contracts_PrimeTransactions_2021-03-19_H02M42S30_1.csv')
statesdict = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District_Of_Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New_Hampshire",
    "NJ": "New_Jersey",
    "NM": "New_Mexico",
    "NY": "New_York",
    "NC": "North_Carolina",
    "ND": "North_Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode_Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West_Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}
df = df.dropna(subset=['recipient_state_code'])
db.create_all()
for i in range(len(df)):
    # contract_award_unique = df.iloc[i]["contract_award_unique_key"]
    contract_award_id = df.iloc[i]["award_id_piid"]
    contract_parentagency = df.iloc[i]["awarding_agency_name"]
    contract_currentval = df.iloc[i]["current_total_value_of_award"]
    contract_recipient = df.iloc[i]["recipient_name"]
    contract_naics = df.iloc[i]["naics_code"]
    contract_sop = df.iloc[i]["recipient_state_code"]
    date = df.iloc[i]["period_of_performance_start_date"]
    contract_recipient_district = df.iloc[i]["recipient_congressional_district"]
    contract_naics_description = df.iloc[i]["naics_description"]
    contract_award_description = df.iloc[i]["award_description"]
    contract_date = date[0:10]
    contract_recipient_address = df.iloc[i]["recipient_address_line_1"]
    contract_stateflag = f"https://en.wikipedia.org/wiki/Flags_of_the_U.S._states_and_territories#/media/File:Flag_of_{statesdict[contract_sop]}.svg"
    contract_agencylogo = "https://upload.wikimedia.org/wikipedia/commons/3/37/USDA_logo.png"
    contract = Contract(contract_award_id = contract_award_id, contract_parentagency = contract_parentagency, contract_currentval = contract_currentval,
    contract_recipient = contract_recipient, contract_naics = contract_naics, contract_sop = contract_sop, contract_recipient_district =contract_recipient_district,
    contract_date = contract_date, contract_recipient_address = contract_recipient_address, contract_stateflag = contract_stateflag, contract_agencylogo =contract_agencylogo,
    contract_naics_description = contract_naics_description,contract_award_description = contract_award_description )
    db.session.add(contract)
    db.session.commit()