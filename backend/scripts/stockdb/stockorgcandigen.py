import csv
import pandas as pd
if __name__ == "__main__":
    tgt = csv.reader(open('stockorg.csv', 'r'))
    tgtlist = []
    kw = csv.reader(open('contributionorg.csv', 'r'))
    kwlist = []
    outputlist = []
    for row in tgt:
        tgtlist.append(row)
    for row in kw:
        kwlist.append(row)
    totalcount = 0
    count2 = 0
    i = 0
    for i in range(len(tgtlist)):
        for j in range(len(kwlist)):
            if tgtlist[i][2] == kwlist[j][1] :
                tgtlist[i].append(kwlist[j][0])
                tgtlist[i].append(kwlist[j][2])
                count2 += 1
                continue
        outputlist.append(tgtlist[i])
    
    test2=pd.DataFrame( data = outputlist)
                
    test2.to_csv('stockorgcandi.csv')
    # the output file needs to be checked and some lines need to be deleted manually because of unmatching and repeating
    print(count2)