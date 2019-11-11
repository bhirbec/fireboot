const _ = require('lodash');
const fs = require('fs');
const cheerio = require('cheerio');
const ejs = require('ejs');


class BuildWebsite {
  /**
  BuildWebsite is a webpack plugins which goals is to simplify
  static websites building.

  Dependencies:
  - cheerio: https://github.com/cheeriojs/cheerio
  - EJS: http://ejs.co/
  */
  constructor(context) {
    this.context = _.extend({}, context);
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      // compile HTML
      const layout = compilation.assets['layout.html'].source().toString('utf8');
      for (var f in compilation.assets) {
        if (f.endsWith('.html') && f !== 'layout.html') {
          let page = compilation.assets[f].source().toString('utf8');
          compilation.assets[f] = this.renderAssetWithLayout(layout, page);
        }
      }
      callback();
    })
  }

  renderAssetWithLayout(layout, page) {
    let $page = cheerio.load(page);
    let output = ejs.render(layout, {'$page': $page});

    return {
      source: function() {
        return output;
      },
      size: function() {
        return output.length;
      }
    };
  }
};

module.exports = BuildWebsite;