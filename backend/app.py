# SQLAlchemy database design class
from init import manager, app
from CandidateDB import Candidate, Contribution
from ContractDB import Contract
from StockDB import Matchedstock

V = '/v1'

######## CANDIDATE MODEL ########
manager.create_api(Candidate, results_per_page=16, url_prefix=V)
manager.create_api(Contribution, url_prefix=V)

######## CONTRACT MODEL ########
manager.create_api(Contract, results_per_page=500, url_prefix=V, max_results_per_page = -1)

######## STOCK MODEL ########
manager.create_api(Matchedstock, results_per_page=50, url_prefix=V)

if __name__ == '__main__':
    app.run(port=8081, debug=True)