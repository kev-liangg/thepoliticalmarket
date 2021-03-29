import pandas as pd
from ContractDB import db, Contract
df = pd.read_csv(r'./All_Contracts_PrimeTransactions_2021-03-26_H02M27S12_1.csv')
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
statesFlags = {
    "AL": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg",
    "AK": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg",
    "AZ": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg",
    "AR": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg",
    "CA": "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg",
    "CO": "https://upload.wikimedia.org/wikipedia/commons/4/46/Flag_of_Colorado.svg",
    "CT": "https://upload.wikimedia.org/wikipedia/commons/9/96/Flag_of_Connecticut.svg",
    "DE": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Flag_of_Delaware.svg",
    "DC": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_the_District_of_Columbia.svg",
    "FL": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg",
    "GA": "https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg",
    "GU": "https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg",
    "HI": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg",
    "ID": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Idaho.svg",
    "IL": "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg",
    "IN": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Flag_of_Indiana.svg",
    "IA": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Iowa.svg",
    "KS": "https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Kansas.svg",
    "KY": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Kentucky.svg",
    "LA": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_Louisiana.svg",
    "ME": "https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Maine.svg",
    "MD": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Maryland.svg",
    "MA": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Massachusetts.svg",
    "MI": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg",
    "MN": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Minnesota.svg",
    "MS": "https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_Mississippi.svg",
    "MO": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg",
    "MT": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg",
    "NE": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Nebraska.svg",
    "NV": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg",
    "NH": "https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_New_Hampshire.svg",
    "NJ": "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_New_Jersey.svg",
    "NM": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg",
    "NY": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg",
    "NC": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg",
    "ND": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_North_Dakota.svg",
    "OH": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg",
    "OK": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg",
    "OR": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg",
    "PA": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg",
    "PR": "https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg",
    "RI": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Rhode_Island.svg",
    "SC": "https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_South_Carolina.svg",
    "SD": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_South_Dakota.svg",
    "TN": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg",
    "TX": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg",
    "UT": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Utah.svg",
    "VT": "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Vermont.svg",
    "VA": "https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg",
    "WA": "https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg",
    "WV": "https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_West_Virginia.svg",
    "WI": "https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg",
    "WY": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Wyoming.svg"
}
df = df.dropna(subset=['recipient_state_code'])
df = df[df['award_description'].notnull()]
df = df[df['naics_description'].notnull()]
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
    if(contract_sop in statesFlags):
        contract_stateflag = statesFlags[contract_sop]
    contract_agencylogo = "https://upload.wikimedia.org/wikipedia/commons/3/37/USDA_logo.png"
    contract = Contract(contract_award_id = contract_award_id, contract_parentagency = contract_parentagency, contract_currentval = contract_currentval,
    contract_recipient = contract_recipient, contract_naics = contract_naics, contract_sop = contract_sop, contract_recipient_district =contract_recipient_district,
    contract_date = contract_date, contract_recipient_address = contract_recipient_address, contract_stateflag = contract_stateflag, contract_agencylogo =contract_agencylogo,
    contract_naics_description = contract_naics_description,contract_award_description = contract_award_description )
    db.session.add(contract)
    db.session.commit()