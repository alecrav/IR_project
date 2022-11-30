import scrapy

class BookScraper(scrapy.Spider):
    name = 'footballscraper'
    start_urls = ['https://footballdatabase.com/ranking/world/1']


    def parse(self, response):
        for teams in response.css('tbody tr'):

            try:
                yield {
                    'rank': teams.css('td:nth-child(1)::text').get(),
                    'team_name': teams.css('.limittext::text').get(),
                    'points': teams.css('td:nth-child(3)::text').get(),
                }
            except:
                print("Error")