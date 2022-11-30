import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class BookScraper(CrawlSpider):
    name = "bookscraper"
    start_urls = ["https://www.fifa.com/fifa-world-ranking/men?dateId=id13792"]

    def parse(self, response):
        return 0