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
          compilation.assets[f] = this.renderAssetWithLayout(layout, page, assets);
        }
      }

      callback();
    })
  }

  renderAssetWithLayout(layout, page, assets) {
    let context = _.extend({}, this.context, {'assets': assets});
    let $page = cheerio.load(ejs.render(page, context));

    context = _.extend({}, this.context, {'$page': $page, 'assets': assets});
    let output = ejs.render(layout, context);

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