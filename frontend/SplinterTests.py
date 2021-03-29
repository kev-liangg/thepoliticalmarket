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
        browser.visit('https://www.thepoliticalmarket.tech/Campfin')
        text = browser.find_by_text('OpenSecrets ID')
        browser.quit()
        self.assertEqual(text, 'OpenSecrets ID')
    def test_politiciansTest(self):
        browser = Browser('chrome')
        browser.visit('https://www.thepoliticalmarket.tech/Stocks')
        text = browser.find_by_text('Symbol')
        browser.quit()
        self.assertEqual(text, 'Symbol')    



if __name__ == '__main__':
    unittest.main()
        