from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestPartOfSite(unittest.TestCase):

    #Some test/browser combinations require extra time for the page to load
    time_to_sleep = 2

    #Which environment to test
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
        #Firefox doesn't need to sleep for some reason
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
        driver = self.driver
        environment = self.environment
        driver.get(self.environment + "")
        driver.find_element(By.XPATH, "//a[@href='/about']").click()
        self.assertEqual(environment + "/about", driver.current_url)
        driver.find_element(By.XPATH, "//a[@href='/articles']").click()
        self.assertEqual(environment + "/articles", driver.current_url)
        driver.find_element(By.XPATH, "//a[@href='/developers']").click()
        self.assertEqual(environment + "/developers", driver.current_url)
        driver.find_element(By.XPATH, "//a[@href='/games']").click()
        self.assertEqual(environment + "/games", driver.current_url)
        driver.find_element(By.XPATH, "//a[@href='/']").click()
        self.assertEqual(environment + "/", driver.current_url)
        driver.close()
    
class TestGrid(TestPartOfSite):

    def part(self):
        driver = self.driver
        environment = self.environment
        grid_name = self.grid_name
        time_to_sleep = self.time_to_sleep
        
        """Testing Pagination"""
        driver.get(environment + "/" + grid_name + "")
        time.sleep(time_to_sleep)
        #Click a page number
        driver.find_element(By.XPATH, "//a[@href='/" + grid_name + "?page=3']").click()
        self.assertEqual(environment + "/" + grid_name + "?page=3", driver.current_url)
        time.sleep(time_to_sleep)
        #Click max value
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-1].click()
        self.assertNotEqual(environment + "/" + grid_name + "?page=3", driver.current_url)
        time.sleep(time_to_sleep)
        #Click first page
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[0].click()
        self.assertEqual(environment + "/" + grid_name + "?page=1", driver.current_url)
        time.sleep(time_to_sleep)
        #Click next page
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-2].click()
        self.assertEqual(environment + "/" + grid_name + "?page=2", driver.current_url)
        time.sleep(time_to_sleep)
        #Click previous page
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[1].click()
        self.assertEqual(environment + "/" + grid_name + "?page=1", driver.current_url)
        driver.close()
    
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
