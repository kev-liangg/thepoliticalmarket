import csv
import pandas as pd
if __name__ == "__main__":
    tgt = csv.reader(open('testte2st.csv', 'r'))
    tgtlist = []
    outputlist = []
    for row in tgt:
        tgtlist.append(row)
    print("tgt loaded")    
    totalcount = 0
    name=['id','state']
    for i in range(len(tgtlist) -1 ):
        if totalcount < 10:
            if tgtlist[i][1] ==  tgtlist[i + 1][1] :
                totalcount += 1
                outputlist.append(tgtlist[i])
        else: 
            if (tgtlist[i][1] != tgtlist[i + 1][1]) :
                totalcount = 0

    test2=pd.DataFrame(columns = name, data = outputlist)
                
    test2.to_csv('test22result.csv')
    # the output file needs to be checked and some lines need to be deleted manually because of unmatching and repeating
