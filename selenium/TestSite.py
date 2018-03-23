from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestPartOfSite(unittest.TestCase):

    #Some test/browser combinations require extra time for the page to load
    time_to_sleep = 2

    #Which environment to test
    #environment = "http://gameframe.online"
    environment = "http://localhost"
     
    def test_chrome(self):
        self.driver = webdriver.Chrome()
        self.do_part()

    def test_edge(self):
        self.driver = webdriver.Edge()
        self.do_part()
    
    def test_firefox(self):
        self.driver = webdriver.Firefox()
        #Firefox doesn't need to sleep for some reason
        self.time_to_sleep = 0
        self.do_part()

    def part(self):
        pass

    def do_part(self):
        try:
            self.part()
        except Exception as e:
            self.fail(e)
        finally:
            self.driver.close()

class TestHomepage(TestPartOfSite):
    
    def part(self):
        self.driver.get(self.environment)
        self.assertEqual(self.environment + "/", self.driver.current_url)
        self.assertEqual("GameFrame.online", self.driver.title)
    
class TestNavbar(TestPartOfSite):

    def part(self):
        driver = self.driver
        environment = self.environment
        driver.get(environment)
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
    
class TestGrid(TestPartOfSite):

    grid_name = ""

    def click_page(self, driver, environment, grid_name, index, number):
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[index].click()
        self.assertEqual(environment + "/" + grid_name + "?page=" + number, driver.current_url)

    def part(self):
        driver = self.driver
        environment = self.environment
        grid_name = self.grid_name
        time_to_sleep = self.time_to_sleep
        
        """Testing Pagination"""
        driver.get(environment + "/" + grid_name + "")
        time.sleep(time_to_sleep)
        #Click a page number
        self.click_page(driver, environment, grid_name, 1, "3")
        #Click max value
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-1].click()
        self.assertNotEqual(environment + "/" + grid_name + "?page=3", driver.current_url)
        #Click first page
        self.click_page(driver, environment, grid_name, 0, "1")
        #Click next page
        self.click_page(driver, environment, grid_name, -2, "2")
        #Click previous page
        self.click_page(driver, environment, grid_name, 1, "1")
    
class TestGames(TestGrid):

    grid_name = "games"

class TestDevelopers(TestGrid):

    grid_name = "developers"

class TestArticles(TestGrid):

    grid_name = "articles"

class TestRelations(TestPartOfSite):

    def find_game(self, time_to_sleep=0):
        time.sleep(time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/games/126']").click()
        self.assertEqual(self.environment + "/games/126", self.driver.current_url)
    
    def find_developer(self, time_to_sleep=0):
        time.sleep(time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/developers/291']").click()
        self.assertEqual(self.environment + "/developers/291", self.driver.current_url)
    
    def find_article(self, time_to_sleep=0):
        time.sleep(time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/articles/11314']").click()
        self.assertEqual(self.environment + "/articles/11314", self.driver.current_url)

class TestGameRelations(TestRelations):

    def part(self):
        self.driver.get(self.environment + "/games/126")
        self.find_developer(self.time_to_sleep)
        self.find_article(self.time_to_sleep)
        self.find_game(self.time_to_sleep)
        self.find_article()
        self.find_developer()
        self.find_game()
    
class TestDeveloperRelations(TestRelations):

    def part(self):
        self.driver.get(self.environment + "/developers/291")
        self.find_game(self.time_to_sleep)
        self.find_article(self.time_to_sleep)
        self.find_developer(self.time_to_sleep)
        self.find_article()
        self.find_game()
        self.find_developer()
    
class TestArticleRelations(TestRelations):

    def part(self):
        self.driver.get(self.environment + "/articles/11314")
        self.find_game(self.time_to_sleep)
        self.find_developer(self.time_to_sleep)
        self.find_article(self.time_to_sleep)
        self.find_developer()
        self.find_game()
        self.find_article()

if __name__ == '__main__':
    classes = [TestHomepage, TestNavbar, TestGames, TestDevelopers, TestArticles, TestGameRelations, TestDeveloperRelations, TestArticleRelations]
    loader = unittest.TestLoader()
    tests = []
    for test_class in classes:
        tests += [loader.loadTestsFromTestCase(test_class)]
    runner = unittest.TextTestRunner()
    results = runner.run(unittest.TestSuite(tests))
