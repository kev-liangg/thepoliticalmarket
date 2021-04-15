from splinter import Browser
import unittest
class GUIHarness(unittest.TestCase):
    def test_title(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        title = browser.title
        self.assertEqual(title, 'The Political Market')
    def test_url(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        title = browser.title
        self.assertTrue(browser.is_text_present("The Political Market"))
    def test_navBarLinks(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        browser.click_link_by_text('Contracts')
        self.assertEqual(browser.url, 'https://www.thepoliticalmarket.tech/Contracts')
    def test_contractsTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Contracts')
        text = browser.find_by_text('Contract Page')
        self.assertTrue(browser.is_text_present("Contract Page")) 
    def test_politiciansTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/CampFin')
        text = browser.find_by_text('OpenSecrets ID')
        self.assertTrue(browser.is_text_present("OpenSecrets ID")) 
    def test_stocksTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks')
        text = browser.find_by_text('Symbol')
        self.assertTrue(browser.is_text_present("Symbol")) 
    def test_aboutPage(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/about')
        text = browser.find_by_text('Team Members')
        self.assertTrue(browser.is_text_present("Team Members"))


if __name__ == '__main__':
    unittest.main()
        