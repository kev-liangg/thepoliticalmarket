import csv
import pandas as pd
if __name__ == "__main__":
    tgt = csv.reader(open('orgsstock.csv', 'r'))
    kw = csv.reader(open('stockwithstate.csv', 'r'))
    tgtlist = []
    keyword = []
    outputlist = []
    for row in tgt:
        tgtlist.append(row)
    for row in kw:
        keyword.append(row)
    print("tgt loaded")    
    totalcount = 0
    
    for i in range(len(tgtlist)):
        for j in range(len(keyword)):
            if keyword[j][11] == tgtlist[i][1]:
                totalcount += 1
                tgtlist[i].append(keyword[j][0])
                outputlist.append(tgtlist[i])
                print(tgtlist[i])
    test2=pd.DataFrame( data = outputlist)
                
    test2.to_csv('orgcontrastock.csv')
    # the output file needs to be checked and some lines need to be deleted manually because of unmatching and repeating
    print(totalcount)