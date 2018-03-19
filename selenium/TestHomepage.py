from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest

class TestHomepageFirefox(unittest.TestCase):

    def test_homepage_chrome(self):
        self.driver = webdriver.Chrome()
        self.homepage()

    def test_homepage_edge(self):
        self.driver = webdriver.Edge()
        self.homepage()
    
    def test_homepage_firefox(self):
        self.driver = webdriver.Firefox()
        self.homepage()
    
    def homepage(self):
        self.driver.get("http://gameframe.online")
        self.assertEqual("http://gameframe.online/", self.driver.current_url)
        self.assertEqual("GameFrame.online", self.driver.title)
        self.driver.close()

if __name__ == "__main__":
    unittest.main()