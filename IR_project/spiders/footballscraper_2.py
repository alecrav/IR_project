import scrapy


class Football2Scraper(scrapy.Spider):
    name = "football_scraper_2"
    
    start_urls = ["https://projects.fivethirtyeight.com/soccer-predictions/global-club-rankings/"]

    def parse(self, response):
        for teams in response.css('table.all-teams tbody tr'):
            yield {
                'name': teams.css('td.team div.name::text').get(),
                'league': teams.css('a.name::text').get(),
                'country': teams.css('td.country::text').get(),
                'rank': teams.css('td.num::text').get(),
                'logo': teams.css('div.logo').attrib['data-imgurl']
            }