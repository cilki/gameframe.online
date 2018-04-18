from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import ui
from selenium.webdriver.support import expected_conditions as EC
import unittest, time

class TestPartOfSite(unittest.TestCase):
    """
    Structure for every following test
    """

    # Maximum time to wait on a page or element to be available
    timeout = 10

    # Which environment to test
    environment = "http://gameframe.online"
    # environment = "http://localhost"
     
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
        """
        Wrapper for part function for graceful failures as errors do not close the browser which causes the rest of those tests to fail.
        """
        try:
            self.part()
        except Exception as e:
            raise e
        finally:
            self.driver.close()

class TestHomepage(TestPartOfSite):
    
    def part(self):
        """
        Trivial test to ensure the URL and homepage title are what we expect
        """
        self.driver.get(self.environment)
        self.assertEqual(self.environment + "/", self.driver.current_url)
        self.assertEqual("GameFrame.online", self.driver.title)
    
class TestNavbar(TestPartOfSite):

    def part(self):
        """
        Makes sure each link on the Navbar takes the user to the appropriate page
        """
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

    # Name of grid page to test
    grid_name = ""

    def click_page(self, index, number):
        """
        Clicks the pagination button indicated by 'index' and checks that the URL ends in 'number'
        """
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[index].click()
        self.assertEqual(self.environment + "/" + self.grid_name + "?page=" + number, self.driver.current_url)

    def part(self):
        """
        Click intermediate, last, first, next, and previous page links
        """
        self.driver.get(self.environment + "/" + self.grid_name + "")
        ui.WebDriverWait(self.driver, self.timeout).until(EC.element_to_be_clickable((By.CLASS_NAME, "pagination")))
        self.click_page(1, "3") # Click a page number
        self.click_page(-1, self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-3].text) # Click last page
        self.click_page(0, "1") # Click first page
        self.click_page(-2, "2") # Click next page
        self.click_page(1, "1") # Click previous page
    
class TestGamesPagination(TestPagination):

    grid_name = "games"

class TestDevelopersPagination(TestPagination):

    grid_name = "developers"

class TestArticlesPagination(TestPagination):

    grid_name = "articles"

class TestSort(TestPartOfSite):

    # Name of grid page to test
    grid_name = ""

    def part(self):
        """
        Sort on every attribute/direction combination
        """
        self.driver.get(self.environment + "/" + self.grid_name)
        ui.WebDriverWait(self.driver, self.timeout).until(EC.element_to_be_clickable((By.CLASS_NAME, "Select"))).click()
        for i in range(len(self.driver.find_elements(By.CLASS_NAME, "Select-option"))): # sort on attributes
            self.driver.find_elements(By.CLASS_NAME, "Select-option")[i].click()
            self.driver.find_elements(By.CLASS_NAME, "Select")[1].click()
            for j in range(2): # sort by ASC/DESC
                self.driver.find_elements(By.CLASS_NAME, "Select-option")[j].click()
                self.driver.find_elements(By.CLASS_NAME, "Select")[1].click()
            self.driver.find_element(By.CLASS_NAME, "Select").click()
    
class TestGamesSort(TestSort):

    grid_name = "games"
    
class TestDevelopersSort(TestSort):

    grid_name = "developers"
    
class TestArticlesSort(TestSort):

    grid_name = "articles"

class TestRelations(TestPartOfSite):
    """
    Provides functions to test if links exist between instances
    """

    def game_exists(self):
        self.assertTrue(self.driver.find_element(By.XPATH, "//a[contains(@href, 'games')]").is_displayed())
    
    def developer_exists(self):
        self.assertTrue(self.driver.find_element(By.XPATH, "//a[contains(@href, 'developers')]").is_displayed())
    
    def article_exists(self):
        self.assertTrue(self.driver.find_element(By.XPATH, "//a[contains(@href, 'articles')]").is_displayed())
    
    def get_first_elem_from_grid(self, grid_name):
        self.driver.get(self.environment + "/" + grid_name + "/")
        ui.WebDriverWait(self.driver, self.timeout).until(EC.element_to_be_clickable((By.XPATH, "//a[contains(@href, '" + grid_name + "/')]/div"))).click()

class TestGameRelations(TestRelations):

    def part(self):
        self.get_first_elem_from_grid("games")
        self.developer_exists()
        self.article_exists()
    
class TestDeveloperRelations(TestRelations):

    def part(self):
        self.get_first_elem_from_grid("developers")
        self.game_exists()
        self.article_exists()
    
class TestArticleRelations(TestRelations):

    def part(self):
        self.get_first_elem_from_grid("articles")
        self.game_exists()
        self.developer_exists()

class TestSearch(TestRelations):

    def part(self):
        """
        Tests that searching will return instances of all models
        """
        self.driver.get(self.environment)
        self.driver.find_element(By.TAG_NAME, "input").send_keys("rocket league", Keys.ENTER)
        self.assertEqual(self.environment + "/search?q=rocket%20league", self.driver.current_url)
        ui.WebDriverWait(self.driver, self.timeout).until(EC.element_to_be_clickable((By.XPATH, "//a[contains(@href, 'games/')]")))
        self.game_exists()
        self.developer_exists()
        self.article_exists()

if __name__ == '__main__':
    classes = [ \
        TestHomepage, \
        TestNavbar, \
        TestGamesPagination, \
        TestDevelopersPagination, \
        TestArticlesPagination, \
        TestGamesSort, \
        TestDevelopersSort, \
        TestArticlesSort, \
        TestGameRelations, \
        TestDeveloperRelations, \
        TestArticleRelations, \
        TestSearch \
    ]
    loader = unittest.TestLoader()
    tests = []
    for test_class in classes:
        tests += [loader.loadTestsFromTestCase(test_class)]
    runner = unittest.TextTestRunner()
    results = runner.run(unittest.TestSuite(tests))
