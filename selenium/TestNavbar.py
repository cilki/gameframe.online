from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest

class TestNavbar(unittest.TestCase):

    def test_navbar_chrome(self):
        self.driver = webdriver.Chrome()
        self.navbar()
    
    def test_navbar_edge(self):
        self.driver = webdriver.Edge()
        self.navbar()

    def test_navbar_firefox(self):
        self.driver = webdriver.Firefox()
        self.navbar()

    def navbar(self):
        self.driver.get("http://localhost")
        self.driver.find_element(By.XPATH, "//a[@href='/about']").click()
        self.assertEqual("http://localhost/about", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/articles']").click()
        self.assertEqual("http://localhost/articles", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/developers']").click()
        self.assertEqual("http://localhost/developers", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/games']").click()
        self.assertEqual("http://localhost/games", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/']").click()
        self.assertEqual("http://localhost/", self.driver.current_url)
        self.driver.close()

if __name__ == "__main__":
    unittest.main()