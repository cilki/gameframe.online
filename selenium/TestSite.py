from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestPartOfSite(unittest.TestCase):

    time_to_sleep = 2
    environment = "http://gameframe.online"
    #environment = "http://localhost"
     
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
        self.driver.get(self.environment)
        self.assertEqual(self.environment + "/", self.driver.current_url)
        self.assertEqual("GameFrame.online", self.driver.title)
        self.driver.close()
    
class TestNavbar(TestPartOfSite):

    def part(self):
        self.driver.get(self.environment + "")
        self.driver.find_element(By.XPATH, "//a[@href='/about']").click()
        self.assertEqual(self.environment + "/about", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/articles']").click()
        self.assertEqual(self.environment + "/articles", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/developers']").click()
        self.assertEqual(self.environment + "/developers", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/games']").click()
        self.assertEqual(self.environment + "/games", self.driver.current_url)
        self.driver.find_element(By.XPATH, "//a[@href='/']").click()
        self.assertEqual(self.environment + "/", self.driver.current_url)
        self.driver.close()
    
class TestGrid(TestPartOfSite):

    def part(self):
        """Testing Pagination"""
        self.driver.get(self.environment + "/" + self.grid_name + "")
        time.sleep(self.time_to_sleep)
        #Click a page number
        self.driver.find_element(By.XPATH, "//a[@href='/" + self.grid_name + "?page=3']").click()
        self.assertEqual(self.environment + "/" + self.grid_name + "?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click max value
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-1].click()
        self.assertNotEqual(self.environment + "/" + self.grid_name + "?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click first page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[0].click()
        self.assertEqual(self.environment + "/" + self.grid_name + "?page=1", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click next page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-2].click()
        self.assertEqual(self.environment + "/" + self.grid_name + "?page=2", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click previous page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[1].click()
        self.assertEqual(self.environment + "/" + self.grid_name + "?page=1", self.driver.current_url)
        self.driver.close()
    
class TestGames(TestGrid):

    grid_name = "games"

class TestDevelopers(TestGrid):

    grid_name = "developers"

class TestArticles(TestGrid):

    grid_name = "articles"

if __name__ == '__main__':
    classes = [TestHomepage, TestNavbar, TestGames, TestDevelopers, TestArticles]
    loader = unittest.TestLoader()
    tests = []
    for test_class in classes:
        tests += [loader.loadTestsFromTestCase(test_class)]
    runner = unittest.TextTestRunner()
    results = runner.run(unittest.TestSuite(tests))