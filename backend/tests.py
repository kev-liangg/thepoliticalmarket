# all tests must begin with "test"
from unittest import main, TestCase
import requests
import csv



class TestBackend(TestCase):
    def test_paging(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate")
        assert res.status_code == 200
        assert res.json()["page"] == 1
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate?page=2")
        assert res.status_code == 200
        assert res.json()["page"] == 2

    def test_candidate(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate")
        assert res.status_code == 200
        assert res.json()["num_results"] == 549

    def test_candidate_instance(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate/N00000078")
        assert res.status_code == 200
        data = res.json()
        assert data["cand_crp_id"] == "N00000078"
        assert data["cand_firstname"] == "Carolyn"
        assert data["cand_lastname"] == "Maloney"
        assert (
            data["cand_image"]
            == "https://www.govtrack.us/static/legislator-photos/400251-200px.jpeg"
        )
        assert data["cand_office"] == "House"
        assert data["cand_party"] == "Democrat"
        assert data["cand_state"] == "NY"
        assert data["cycle"] == 2020

    
    def test_candidate_instance1(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate/N00000179")
        assert res.status_code == 200
        data = res.json()
        assert data["cand_crp_id"] == "N00000179"
        assert data["cand_firstname"] == "James"
        assert data["cand_lastname"] == "McGovern"
        assert (
            data["cand_image"]
            == "https://www.govtrack.us/static/legislator-photos/400263-200px.jpeg"
        )
        assert data["cand_office"] == "House"
        assert data["cand_party"] == "Democrat"
        assert data["cand_state"] == "MA"
        assert data["cycle"] == 2020

    
    def test_candidate_instance2(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/candidate/N00000615")
        assert res.status_code == 200
        data = res.json()
        assert data["cand_crp_id"] == "N00000615"
        assert data["cand_firstname"] == "Rosa"
        assert data["cand_lastname"] == "DeLauro"
        assert (
            data["cand_image"]
            == "https://www.govtrack.us/static/legislator-photos/400103-200px.jpeg"
        )
        assert data["cand_office"] == "House"
        assert data["cand_party"] == "Democrat"
        assert data["cand_state"] == "CT"
        assert data["cycle"] == 2020

    def test_matchedstock(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/matchedstock")
        assert res.status_code == 200
        assert res.json()["num_results"] == 482

    def test_matchedstock_instance_1for10(self):
        r = open('tests/stockinstancestest.csv','r')
        tgt = csv.reader(r)
        checklist = []
        for row in tgt:
            checklist.append(row)
        i = 0
        r.close()
        while i < 10 and i < len(checklist):
            res = requests.get("https://api.thepoliticalmarket.tech/v1/matchedstock/" + checklist[i][0])
            assert res.status_code == 200
            data = res.json()
            assert data["IPO_Year"] == (int)(checklist[i][7])
            assert data["Full_Name"] == checklist[i][1]
            assert data["Volume"] == (int)(checklist[i][8])
            i += 1
        

    def test_matchedstock_instance(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/matchedstock/aapl")
        assert res.status_code == 200
        data = res.json()
        assert data["Country"] == "United Sta"
        assert data["Full_Name"] == "Apple Inc. Common Stock"
        assert data["IPO_Year"] == 1980
        assert data["Industry"] == "Computer Manufacturing"
        assert data["Last_Sale"] == 123.01
        assert data["Market_Cap"] == 2130000000000
        assert data["Net_Change"] == -2.56
        assert data["Orgname"] == "Apple Inc"
        assert data["Percentage_Change"] == "-2.04%"
        assert data["Sector"] == "Technology"
        assert data["State"] == "CA"
        assert data["Symbol"] == "AAPL"
        assert data["Volume"] == 28163607


    def test_contract(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/contract")
        assert res.status_code == 200
        assert res.json()["num_results"] == 4748

    def test_contract_instance(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/contract/1")
        assert res.status_code == 200
        data = res.json()
        assert (
            data["contract_agencylogo"]
            == "https://upload.wikimedia.org/wikipedia/commons/3/37/USDA_logo.png"
        )
        assert (
            data["contract_award_description"]
            == "200212!001205!2100!AB07  !USA COMMUNICATIONS-ELECTRONICS  !DAAB0702CJ204  !A!N! !N!                   !20020131!20031231!160386082!160386082!007321904!N!TEXAS INSTRUMENTS INCORPORATED!2501 W UNIVERSIT"
        )
        assert data["contract_award_id"] == "DAAB0702CJ204"
        assert data["contract_currentval"] == 0.0
        assert data["contract_date"] == "2002-01-31"
        assert data["contract_naics"] == 334511
        assert (
            data["contract_naics_description"]
            == "SEARCH, DETECTION, NAVIGATION, GUIDANCE, AERONAUTICAL, AND NAUTICAL SYSTEM AND INSTRUMENT MANUFACTUR"
        )
        assert data["contract_parentagency"] == "DEPARTMENT OF DEFENSE (DOD)"
        assert data["contract_recipient"] == "TEXAS INSTRUMENTS INCORPORATED"
        assert data["contract_recipient_address"] == "2501 W UNIVERSITY DR"
        assert data["contract_recipient_district"] == 4
        assert data["contract_sop"] == "TX"
        assert (
            data["contract_stateflag"]
            == "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg"
        )
        assert data["id"] == 1

    def test_contract_instance2(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/contract/2")
        assert res.status_code == 200
        data = res.json()
        assert (
            data["contract_agencylogo"]
            == "https://upload.wikimedia.org/wikipedia/commons/3/37/USDA_logo.png"
        )
        assert data["contract_award_id"] == "DAAE3099C1104"
        assert data["contract_currentval"] == 294570.0
        assert data["contract_date"] == "1999-09-14"
        assert data["contract_naics"] == 332993
        assert data["contract_parentagency"] == "DEPARTMENT OF DEFENSE (DOD)"
        assert data["contract_recipient"] == "HITECH HOLDINGS INC"
        assert data["contract_recipient_address"] == "1 2 MILE WEST OF HWY 203"
        assert data["contract_recipient_district"] == 4
        assert data["contract_sop"] == "AR"
        assert (
            data["contract_stateflag"]
            == "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg"
        )
        assert data["id"] == 2

    
    def test_contract_instance3(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/contract/3")
        assert res.status_code == 200
        data = res.json()
        assert (
            data["contract_agencylogo"]
            == "https://upload.wikimedia.org/wikipedia/commons/3/37/USDA_logo.png"
        )
        assert data["contract_award_id"] == "DAAD1301C0003"
        assert data["contract_currentval"] == 0.0
        assert data["contract_date"] == "2000-10-18"
        assert data["contract_naics"] == 334516
        assert data["contract_parentagency"] == "DEPARTMENT OF DEFENSE (DOD)"
        assert data["contract_recipient"] == "CHEMRING SENSORS AND ELECTRONIC SYSTEMS, INC."
        assert data["contract_recipient_address"] == "23031 LADBROOK DR"
        assert data["contract_recipient_district"] == 10
        assert data["contract_sop"] == "VA"
        assert (
            data["contract_stateflag"]
            == "https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg"
        )
        assert data["id"] == 3

if __name__ == "__main__":
    main()
