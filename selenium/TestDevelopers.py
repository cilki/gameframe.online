from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestDevelopers(unittest.TestCase):

    time_to_sleep = 2

    def test_developers_chrome(self):
        self.driver = webdriver.Chrome()
        self.developers()
    
    def test_developers_edge(self):
        self.driver = webdriver.Edge()
        self.developers()

    def test_developers_firefox(self):
        self.driver = webdriver.Firefox()
        self.time_to_sleep = 0
        self.developers()

    def developers(self):
        """Testing Pagination"""
        self.driver.get("http://localhost/developers")
        time.sleep(self.time_to_sleep)
        #Click a page number
        self.driver.find_element(By.XPATH, "//a[@href='/developers?page=3']").click()
        self.assertEqual("http://localhost/developers?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click max value
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-1].click()
        self.assertNotEqual("http://localhost/developers?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click first page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[0].click()
        self.assertEqual("http://localhost/developers?page=1", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click next page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-2].click()
        self.assertEqual("http://localhost/developers?page=2", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click previous page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[1].click()
        self.assertEqual("http://localhost/developers?page=1", self.driver.current_url)
        self.driver.close()

if __name__ == "__main__":
    unittest.main()