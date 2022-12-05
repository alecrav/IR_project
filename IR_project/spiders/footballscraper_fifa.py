import scrapy
from scrapy.http import Request
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class BookScraper(scrapy.Spider):
    name = 'footballrankings'
    start_urls = ['https://football-ranking.com/fifa_rankings']
    
    def parse(self, response):
        urls = ('https://football-ranking.com/fifa_rankings/?page={}'.format(i) for i in range(2, 5))
        yield Request('https://football-ranking.com/fifa_rankings/', callback=self.parse_page)
        for url in urls:
            yield Request(url, callback=self.parse_page)


    def parse_page(self, response):
        for teams in response.css('.ml-1 tbody tr'):

            try:
                print('here')
                yield {
                    'rank': teams.css('td:nth-child(1)::text').get()[0:2],
                    'name': teams.css('img').get()[15:18],
                    'points': teams.css('b::text').get(),
                }
            except:
                print("Error")