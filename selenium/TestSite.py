from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestPartOfSite(unittest.TestCase):

    #Some tests require extra time for the page to load
    time_to_sleep = 4

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
        self.do_part()

    def part(self):
        pass

    def do_part(self):
        try:
            self.part()
        except Exception as e:
            raise e
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
        driver.find_elements(By.TAG_NAME, "img")[0].click()
        self.assertEqual(environment + "/", driver.current_url)
    
class TestPagination(TestPartOfSite):

    grid_name = ""

    def click_page(self, driver, environment, grid_name, index, number):
        driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[index].click()
        self.assertEqual(environment + "/" + grid_name + "?page=" + number, driver.current_url)

    def part(self):
        driver = self.driver
        environment = self.environment
        grid_name = self.grid_name
        time_to_sleep = self.time_to_sleep
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
    
class TestGamesPagination(TestPagination):

    grid_name = "games"

class TestDevelopersPagination(TestPagination):

    grid_name = "developers"

class TestArticlesPagination(TestPagination):

    grid_name = "articles"

class TestRelations(TestPartOfSite):

    game_id = 9669
    dev_id = 4920
    article_id = 13782

    def find_game(self):
        time.sleep(self.time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/games/" + str(self.game_id) + "']").click()
        self.assertEqual(self.environment + "/games/" + str(self.game_id), self.driver.current_url)
    
    def find_developer(self):
        time.sleep(self.time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/developers/" + str(self.dev_id) +"']").click()
        self.assertEqual(self.environment + "/developers/" + str(self.dev_id), self.driver.current_url)
    
    def find_article(self):
        time.sleep(self.time_to_sleep)
        self.driver.find_element(By.XPATH, "//a[@href='/articles/" + str(self.article_id) +"']").click()
        self.assertEqual(self.environment + "/articles/" + str(self.article_id), self.driver.current_url)

class TestGameRelations(TestRelations):

    time_to_sleep = 8

    def part(self):
        self.driver.get(self.environment + "/games/" + str(self.game_id))
        self.find_developer()
        self.find_article()
        self.find_game()
        self.find_article()
        self.find_developer()
        self.find_game()
    
class TestDeveloperRelations(TestRelations):

    def part(self):
        self.driver.get(self.environment + "/developers/" + str(self.dev_id))
        self.find_game()
        self.find_article()
        self.find_developer()
        self.find_article()
        self.find_game()
        self.find_developer()
    
class TestArticleRelations(TestRelations):

    def part(self):
        self.driver.get(self.environment + "/articles/" + str(self.article_id))
        self.find_game()
        self.find_developer()
        self.find_article()
        self.find_developer()
        self.find_game()
        self.find_article()

class TestSearch(TestRelations):

    article_id = 13783
    time_to_sleep = 10

    def part(self):
        self.driver.get(self.environment)
        search_box = self.driver.find_element(By.TAG_NAME, "input")
        search_box.send_keys("sniper elite")
        search_box.send_keys(Keys.ENTER)
        self.assertEqual(self.environment + "/search?q=sniper%20elite", self.driver.current_url)
        self.find_game()
        self.driver.back()
        self.find_developer()
        self.driver.back()
        self.find_article()        

if __name__ == '__main__':
    classes = [TestHomepage, TestNavbar, TestGamesPagination, TestDevelopersPagination, TestArticlesPagination, TestGameRelations, TestDeveloperRelations, \
               TestArticleRelations, TestSearch]
    loader = unittest.TestLoader()
    tests = []
    for test_class in classes:
        tests += [loader.loadTestsFromTestCase(test_class)]
    runner = unittest.TextTestRunner()
    results = runner.run(unittest.TestSuite(tests))
