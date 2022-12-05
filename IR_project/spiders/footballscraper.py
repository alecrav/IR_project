import scrapy
from scrapy.http import Request

class BookScraper(scrapy.Spider):
    name = 'footballscraper'
    start_urls = ['https://footballdatabase.com/ranking/world']

    def parse(self, response):
        urls = ('https://footballdatabase.com/ranking/world/{}'.format(i) for i in range(1, 57))
        for url in urls:
            yield Request(url, callback=self.parse_page)


    def parse_page(self, response):
        for teams in response.css('tbody tr'):

            try:
                yield {
                    'rank': teams.css('td:nth-child(1)::text').get(),
                    'name': teams.css('.limittext::text').get(),
                    'points': teams.css('td:nth-child(3)::text').get(),
                    'country': teams.css('.sm_logo-name::text').get() 
                }
            except:
                print("Error")