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
    this.options = _.extend({}, options)
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const layout = compilation.assets['layout.html'].source().toString('utf8');
      const hashes = {};

      // this can be improved...
      for (var f in compilation.assets) {
        const arr = f.split('.');
        const l = arr.length - 1;
        const h = arr[l-1];
        arr.splice(-2, 1);
        const rawFilename = arr.join('.');
        hashes[h] = rawFilename;
        console.log(h, rawFilename);
      }

      // TODO: loop over html assets
      let $page = cheerio.load(compilation.assets['index.html'].source());
      compilation.assets['index.html'] = renderAsset(layout, $page)

      $page = cheerio.load(compilation.assets['404.html'].source());
      compilation.assets['404.html'] = renderAsset(layout, $page);

      callback();
    })
  }
}

// TODO: pass hashes here so we can render the script tag
function renderAsset(layout, $page) {
  const output = ejs.render(layout, {$page: $page});
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
