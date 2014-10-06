Scrapio
===

#Installation
```
$ npm install
```

#Utilisation
- start node server

```
$ node scraper.js
Magic happens on port 8088
```

- go to [http://localhost:8088/](http://localhost:8088/)

#Add source
- write source file in ***scrapers/*** directory

```
$ touch scrapers/my-source.js
```

- implements methods :
  - getUrl: function(); *// the url where all happen*
  - scrap: function($); *// the things to do*

- add new source link in viewer (edit ***viewer.html***)
