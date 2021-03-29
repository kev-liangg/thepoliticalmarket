import csv
import pandas as pd
if __name__ == "__main__":
    tgt = csv.reader(open('orgtostock.csv', 'r'))
    tgtlist = []
    outputlist = []
    for row in tgt:
        tgtlist.append(row)
        print(row)
    totalcount = 0
    count2 = 0
    i = 0
    while i < len(tgtlist) - 1:
        if tgtlist[i][0] != tgtlist[i+1][0]:
            outputlist.append(tgtlist[i])
            totalcount += 1
        else:
            j = i + 1
            try : 
                while (tgtlist[j][0] == tgtlist[i][0]) :
                    j += 1
                    count2 +=1
            except: IndexError
        i += 1

    test2=pd.DataFrame( data = outputlist)
                
    test2.to_csv('orgtostock2column.csv')
    # the output file needs to be checked and some lines need to be deleted manually because of unmatching and repeating
    print(totalcount)
    print(count2)