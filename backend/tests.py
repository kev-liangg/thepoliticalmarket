# all tests must begin with "test"
from unittest import main, TestCase
from app1 import Candidate1, Contribution1, Contract1, Matchedstock1
from app1 import db

db.create_all()

class TestBackend(TestCase):

    def test_1(self):
        stock1 = Matchedstock1(Symbol='AAPL', Full_Name='Apple', Last_Sale=0, Net_Change=0, Percentage_Change=0, Market_Cap=0, 
                        Country='US', IPO_Year=0, Volume=0, Sector='sector', Industry=df['Industry'], Orgname=df['Orgname'], State='CA')
        db.session.add(matchedstock1)
        stock2 = Matchedstock1(Symbol='ABBV', Full_Name='Apple', Last_Sale=0, Net_Change=0, Percentage_Change=0, Market_Cap=0, 
                        Country='US', IPO_Year=0, Volume=0, Sector='sector', Industry=df['Industry'], Orgname=df['Orgname'], State='CA')
        db.session.add(stock2)
        

        

        
        
        

    

if __name__=="__main__":
    main()

# def pow2 (p) :
#     return lambda v : v ** p

# def test5 () :
#     a = [2, 3, 4]
#     m = map(pow2(2), a)
#     assert list(m) == [4, 9, 16]
#     assert list(m) == []

# def test7 () :
#     a     = [2, 3, 4]
#     n     = [1]
#     m     = map(lambda v : v ** next(iter(n)), a) # O(1)
#     a    += [5]
#     n[0]  = 2
#     assert list(m) == [4, 9, 16, 25]
#     assert list(m) == []