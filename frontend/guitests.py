from splinter import Browser
import unittest
class GUIHarness(unittest.TestCase):
    def test_title(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        title = browser.title
        browser.quit()
        self.assertEqual(title, 'The Political Market')
    def test_url(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        title = browser.title
        browser.quit()
        self.assertEqual(title, 'The Political Market')
    def test_navBarLinks(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        link = browser.links.find_by_href('http://thepoliticalmarket.tech/Contracts')
        browser.quit()
        self.assertEqual(link, 'http://thepoliticalmarket.tech/Contracts')
    def test_contractsTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Contracts')
        text = browser.find_by_text('Contract Page')
        browser.quit()
        self.assertEqual(text, 'Contract Page') 
    def test_politiciansTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/CampFin')
        text = browser.find_by_text('OpenSecrets ID')
        browser.quit()
        self.assertEqual(text, 'OpenSecrets ID')
    def test_stocksTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks')
        text = browser.find_by_text('Symbol')
        browser.quit()
        self.assertEqual(text, 'Symbol')    
    def test_aboutPage(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/about')
        text = browser.find_by_text('Members')
        browser.quit()
        self.assertEqual(text, 'Members')
    def test_stockInstancePage1(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks/AAL')
        text1 = browser.find_by_text('American Airlines Group Inc. Common Stock')
        text2 = browser.find_by_text('Contracts Performed in TX')
        browser.quit()
        self.assertEqual(text1, 'American Airlines Group Inc. Common Stock')
        self.assertEqual(text2, 'Contracts Performed in TX')
    def test_stockInstancePage2(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks/WFC^Z')
        text1 = browser.find_by_text('Last Sale: 25.37')
        text2 = browser.find_by_text('Industry: None')
        browser.quit()
        self.assertEqual(text1, 'Last Sale: 25.37')
        self.assertEqual(text2, 'Industry: None')
     def test_campFinInstancePage1(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/CampFin/N00000153')
        text1 = browser.find_by_text('Democrat')
        text2 = browser.find_by_text('Individual Contributions ($)')
        browser.quit()
        self.assertEqual(text1, 'Democrat')
        self.assertEqual(text2, 'Individual Contributions ($)')
    def test_campFinInstancePage2(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/CampFin/N00000491')
        text1 = browser.find_by_text('Contracts Performed in ME')
        text2 = browser.find_by_text('Susan Collins')
        browser.quit()
        self.assertEqual(text1, 'Contracts Performed in ME')
        self.assertEqual(text2, 'Susan Collins')
    def test_contractInstancePage1(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Contracts/2')
        text1 = browser.find_by_text('Congress Politicians in AR')
        text2 = browser.find_by_text('DAAE3099C1104')
        browser.quit()
        self.assertEqual(text1, 'Congress Politicians in AR')
        self.assertEqual(text2, 'DAAE3099C1104')
    def test_contractInstancePage2(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Contracts/10')
        text1 = browser.find_by_text('ORDNANCE SYSTEMS INCORPORATED')
        text2 = browser.find_by_text('4509 W STONE DR')
        browser.quit()
        self.assertEqual(text1, 'ORDNANCE SYSTEMS INCORPORATED')
        self.assertEqual(text2, '4509 W STONE DR')






if __name__ == '__main__':
    unittest.main()
        