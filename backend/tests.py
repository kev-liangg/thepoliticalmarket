# all tests must begin with "test"
from unittest import main, TestCase
import requests


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
        assert data["cand_office"] == "r"
        assert data["cand_party"] == "D"
        assert data["cand_state"] == "NY"
        assert data["cycle"] == 2020

    def test_matchedstock(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/matchedstock")
        assert res.status_code == 200
        assert res.json()["num_results"] == 482

    def test_matchedstock_instance(self):
        res = requests.get("https://api.thepoliticalmarket.tech/v1/matchedstock/aapl")
        assert res.status_code == 200
        data = res.json()
        assert data["Country"] == "United Sta"
        assert data["Full_Name"] == "Apple Inc. Common Stock"
        assert data["IPO_Year"] == 1980
        assert data["Industry"] == "Computer Manufacturing"
        assert data["Last_Sale"] == 123.01
        assert data["Market_Cap"] == 2130000000
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


if __name__ == "__main__":
    main()
