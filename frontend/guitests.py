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
        self.assertTrue(browser.is_text_present("The Political Market"))
    def test_navBarLinks(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/')
        browser.click_link_by_text('Contracts')
        self.assertEqual(browser.url, 'https://www.thepoliticalmarket.tech/Contracts')
    def test_contractsTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Contracts')
        self.assertTrue(browser.is_text_present("Contract Page")) 
    def test_politiciansTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/CampFin')
        self.assertTrue(browser.is_text_present("OpenSecrets ID")) 
    def test_stocksTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks')
        self.assertTrue(browser.is_text_present("Symbol")) 
    def test_aboutPage(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/about')
        self.assertTrue(browser.is_text_present("Team Members"))


if __name__ == '__main__':
    unittest.main()
        