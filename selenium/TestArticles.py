from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import unittest, time

class TestArticles(unittest.TestCase):

    time_to_sleep = 2

    def test_articles_chrome(self):
        self.driver = webdriver.Chrome()
        self.articles()
    
    def test_articles_edge(self):
        self.driver = webdriver.Edge()
        self.articles()

    def test_articles_firefox(self):
        self.driver = webdriver.Firefox()
        self.time_to_sleep = 3
        self.articles()

    def articles(self):
        """Testing Pagination"""
        self.driver.get("http://localhost/articles")
        time.sleep(self.time_to_sleep)
        #Click a page number
        self.driver.find_element(By.LINK_TEXT, "3").click()
        self.assertEqual("http://localhost/articles?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click max value
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-1].click()
        self.assertNotEqual("http://localhost/articles?page=3", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click first page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[0].click()
        self.assertEqual("http://localhost/articles?page=1", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click next page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[-2].click()
        self.assertEqual("http://localhost/articles?page=2", self.driver.current_url)
        time.sleep(self.time_to_sleep)
        #Click previous page
        self.driver.find_element(By.CLASS_NAME, "pagination").find_elements(By.TAG_NAME, "a")[1].click()
        self.assertEqual("http://localhost/articles?page=1", self.driver.current_url)
        self.driver.close()

if __name__ == "__main__":
    unittest.main()