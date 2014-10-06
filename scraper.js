var
  express = require("express"),
  request = require("request"),
  cheerio = require("cheerio")
;

var app = express();
app.listen('8088');
console.log('Magic happens on port 8088');

app.get('/scrape/:name', function(req, res){

  try {
    var scraper = require('./scrapers/' + req.params.name)();
  } catch (e) {
    return res.send("Can't find Scraper for " + req.params.name);
  }

  request({uri: scraper.getUrl()}, function(error, response, body) {
    if (error) {
      return res.send("Error occured : " + error);
    }

    return res.send(
      JSON.stringify(
        scraper.scrap(cheerio.load(body))
      )
    );
  });
});

app.get('/', function(req, res){
  res.sendFile('viewer.html', {root: __dirname });
});
