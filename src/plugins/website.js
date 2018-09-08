const _ = require('lodash');
const fs = require('fs');
const cheerio = require('cheerio');
const ejs = require('ejs');


class  BuildWebsite {
  /**
  BuildWebsite is a webpack plugins which goals is to simplify
  static websites building.

  Dependencies:
  - cheerio: https://github.com/cheeriojs/cheerio
  - EJS: http://ejs.co/
  */
  constructor(options) {
    this.options = _.extend({}, options);
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      // map asset name to asset name with hash
      const assets = {};
      for (var f in compilation.assets) {
        const arr = f.split('.');
        arr.splice(-2, 1); // remove hash
        assets[arr.join('.')] = f;
      }

      // compile HTML
      const layout = compilation.assets['layout.html'].source().toString('utf8');
      for (var f in compilation.assets) {
        if (f.endsWith('.html') && f !== 'layout.html') {
          let page = compilation.assets[f].source().toString('utf8');
          compilation.assets[f] = renderAsset(layout, page, assets);
        }
      }

      callback();
    })
  }
}

function renderAsset(layout, page, assets) {
  let $page = cheerio.load(ejs.render(page, {'assets': assets}));
  let output = ejs.render(layout, {'$page': $page, 'assets': assets});
  return {
    source: function() {
      return output;
    },
    size: function() {
      return output.length;
    }
  };
}

module.exports = BuildWebsite;
