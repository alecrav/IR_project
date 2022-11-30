import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class BookScraper(scrapy.Spider):
    name = 'footballrankings'
    start_urls = ['https://football-ranking.com/fifa_rankings']


    def parse(self, response):
        for teams in response.css('.ml-1 > tbody tr'):

            try:
                print('here')
                yield {
                    'rank': teams.css('td::text').get()[0:2],
                    'team_name': teams.css('img').get()[15:18],
                    'points': teams.css('b::text').get(),
                }
            except:
                print("Error")