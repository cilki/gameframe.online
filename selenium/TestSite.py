from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest

class TestPartOfSite(unittest.TestCase):

    time_to_sleep = 2
     
    def test_chrome(self):
        self.driver = webdriver.Chrome()
        self.part()

    def test_edge(self):
        self.driver = webdriver.Edge()
        self.part()
    
    def test_firefox(self):
        self.driver = webdriver.Firefox()
        self.time_to_sleep = 0
        self.part()

    def part():
        self.driver.close()

class TestHomepage(TestPartOfSite):
    
    def part(self):
        self.driver.get("http://gameframe.online")
        self.assertEqual("http://gameframe.online/", self.driver.current_url)
        self.assertEqual("GameFrame.online", self.driver.title)
        self.driver.close()
    
class TestNavbar(TestPartOfSite):

    def part(self):
        self.driver.get("http://gameframe.online")
        self.driver.find_element(By.XPATH, "//a[@href='/about']").click()
        self.assertEqual("http://gameframe.online/about", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/articles']").click()
        self.assertEqual("http://gameframe.online/articles", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/developers']").click()
        self.assertEqual("http://gameframe.online/developers", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/games']").click()
        self.assertEqual("http://gameframe.online/games", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/']").click()
        self.assertEqual("http://gameframe.online/", self.driver.current_url)
        self.driver.close()

if __name__ == '__main__':
    classes = [TestHomepage, TestNavbar]
    loader = unittest.TestLoader()
    tests = []
    for test_class in classes:
        tests += [loader.loadTestsFromTestCase(test_class)]
    runner = unittest.TextTestRunner()
    results = runner.run(unittest.TestSuite(tests))