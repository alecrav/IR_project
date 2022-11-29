import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class BookScraper(CrawlSpider):
    name = "bookscraper"
    start_urls = ["https://www.fifa.com/fifa-world-ranking/men?dateId=id13792"]

    rules = (
        Rule(LinkExtractor(restrict_css=".nav-list > li > ul > li > a"), follow=True),
        Rule(LinkExtractor(restrict_css=".product_pod > h3 > a"), callback="parse_team")
    )

    def parse_book(self, response):
        team_item = scrapy.Item()

        team_item["image_url"] = response.urljoin(response.css(".item.active > img::attr(src)").get())
        team_item["team_name"] = response.css(".col-sm-6.product_main > ").get()
        team_item["price"] = response.css(".price_color::text").get()
        team_item["upc"] = response.css(".table.table-striped > tr:nth-child(1) > td::text").get()
        team_item["url"] = response.url
        return team_item
