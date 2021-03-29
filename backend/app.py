# SQLAlchemy database design class
from init import manager, app
from CandidateDB import Candidate, Contribution
from ContractDB import Contract
from StockDB import Matchedstock

######## CANDIDATE MODEL ########
manager.create_api(Candidate, results_per_page=16)
manager.create_api(Contribution)

######## CONTRACT MODEL ########
manager.create_api(Contract, results_per_page = 10)

######## STOCK MODEL ########
manager.create_api(Matchedstock, results_per_page = 50)

if __name__ == '__main__':
    app.run(port=8081, debug=True)