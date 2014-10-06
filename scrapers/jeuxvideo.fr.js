var _ = require('underscore');

module.exports = function() {

  var description = {
    url: "http://www.jeuxvideo.fr/",
    selectors: {
      items: "#wrapper-news > li",
      item: {
        link: 'h3 a',
        title: "h3 a",
        subtitle: "",
        picture: "img",
        date: ".dateNews",
        type: ".typeNews"
      }
    }
  };

  return {
    getUrl: function() {
      return description.url;
    },

    scrap: function($) {
      var self = this;

      return _.map($(description.selectors.items), function(item){
        return self.scrapItem($(item));
      });
    },

    scrapItem: function($item){
      var itemSelectors = description.selectors.item;

      return {
        link: $item.find(itemSelectors.link).attr("href"),
        title: $item.find(itemSelectors.title).html(),
        subtitle: $item.find(itemSelectors.subtitle).html(),
        picture: (function($picture){
          return $picture.attr('data-src') ? $picture.attr('data-src') : $picture.attr('src')
        })($item.find(itemSelectors.picture)),
        date: $item.find(itemSelectors.date).html(),
        type: $item.find(itemSelectors.type).html()
      };
    }
  };
}
