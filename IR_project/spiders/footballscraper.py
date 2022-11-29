import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class BookScraper(CrawlSpider):
    name = "footballscraper"
    start_urls = ["https://footballdatabase.com/ranking/world/1"]


    def parse_book(self, response):
        return 0