import csv
import pandas as pd
if __name__ == "__main__":
    tgt = csv.reader(open('nasdaq_screener_1615993627114.csv', 'r'))
    kw = csv.reader(open('backend_orgsWithContribs.csv', 'r'))
    tgtlist = []
    keyword = []
    outputlist = []
    for row in tgt:
        tgtlist.append(row)
    print("tgt loaded")    
    for row in kw:
        keyword.append(row)
    print("keyword loaded")  
    totalcount = 0
    name=['Symbol','Full Name','Last Sale','Net Change','% Change','Market Cap','Country','IPO Year','Volume','Sector','Industry','Orgname','Orgnameplaceholder1','Orgnameplaceholder2']
    for i in range(len(tgtlist)):
        for j in range(len(keyword)):
            if keyword[j][0] in tgtlist[i][1]:
                totalcount += 1
                tgtlist[i].append(keyword[j][0])
                outputlist.append(tgtlist[i])
    test2=pd.DataFrame(columns = name, data = outputlist)
                
    test2.to_csv('testresult.csv')
    # the output file needs to be checked and some lines need to be deleted manually because of unmatching and repeating
    print(totalcount)