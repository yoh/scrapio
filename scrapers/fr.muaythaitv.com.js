var _ = require('underscore');

module.exports = function() {

  var description = {
    url: "http://fr.muaythaitv.com/",
    selectors: {
      items: "#home-news .news",
      item: {
        link: 'a',
        title: "h2",
        subtitle: "h3",
        picture: "img",
        date: ".date",
        type: ".type"
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
        link: description.url + $item.find(itemSelectors.link).attr("href"),
        title: $item.find(itemSelectors.title).html(),
        subtitle: $item.find(itemSelectors.subtitle).html(),
        picture: description.url + (function($picture){
          return $picture.attr('data-src') ? $picture.attr('data-src') : $picture.attr('src')
        })($item.find(itemSelectors.picture)),
        date: $item.find(itemSelectors.date).html(),
        type: $item.find(itemSelectors.type).html()
      };
    }
  };
}
