import csv
import pandas as pd
import requests
if __name__ == "__main__":
    tgtlist = []
    dataset = csv.reader(open('testresult.csv','r'))
    count = 0
    outputlist = []

    for row in dataset:
        tgtlist.append(row)
    # need to remove the first row and column if they are empty or headers
    name=['Symbol','Full Name','Last Sale','Net Change','% Change','Market Cap','Country','IPO Year','Volume','Sector','Industry','Orgname','State']

    for i in range(len(tgtlist)):
        cursymbol = tgtlist[i][0]
        print(cursymbol)
        a = requests.get('https://cloud.iexapis.com/stable/stock/' + cursymbol + '/company?token=pk_45efc221ac8a4aff8ebdcc30f1230d8f')
        curstate = ''
        try:
            curstate = a.json()['state']
            count += 1
            print (count)
            print (curstate)
        except:
            curstate = ''
        tgtlist[i].append(curstate)
        outputlist.append(tgtlist[i])
    
    test2=pd.DataFrame(columns = name, data = outputlist)
    test2.to_csv('stockwithstate.csv')
        
        
 
    