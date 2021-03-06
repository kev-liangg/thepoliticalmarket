import requests
import json
import pandas as pd


#url = "https://api.propublica.org/campaign-finance/v1/2020/candidates/P00015891.json"
#auth = requests.auth.HTTPBasicAuth('X-API-key', 'mKEF1IcgXhtrnJFIQ6V8jSUbwUHEv8lgEcGZTXkP')
headers = {"X-API-Key": "mKEF1IcgXhtrnJFIQ6V8jSUbwUHEv8lgEcGZTXkP"}
#resp = requests.get(url, headers=headers)
#print(resp.json())

df = pd.read_csv("candidate_summary_2020.csv")
#print(df[df["Total_Contribution"] != 0])
congress = df[df["Cand_Office"] != "P"]
c = congress[congress["Total_Contribution"] != 0]

cSorted = c.sort_values("Total_Contribution", ascending=False)


f1 = open("PropublicaData.js", "w")
f1.write("")
f1.close()

f = open("PropublicaData.js", "a")
#for id in ids:
ids = cSorted["Cand_Id"]
count = 3
f.write("const PropublicaData = [\n")
for id in ids:
    url = "https://api.propublica.org/campaign-finance/v1/2020/candidates/" + str(id) + ".json"
    #try:
    resp = requests.get(url, headers=headers)
    #print(resp.json() )
    try:
        #results = resp.json()["results"][0]
        json.dump(resp.json(), f, indent=4)
        #f.write(str(results["id"]) + " : " + str(results["name"]) + " : " + str(results["total_contributions"]) + "\n") 
    except:
        pass
    #except InvalidSchema as e:
    #    print(e)
    f.write(",\n")
    count -= 1
    if count == 0:
        break
f.write("\n]")
f.write("\n\nexport default PropublicaData;")
f.close()

#print(type(resp.json()["results"][0]["total_contributions"]))


#curl "https://api.propublica.org/campaign-finance/v1/2016/candidates/search.json"
#  -H "X-API-Key: mKEF1IcgXhtrnJFIQ6V8jSUbwUHEv8lgEcGZTXkP"